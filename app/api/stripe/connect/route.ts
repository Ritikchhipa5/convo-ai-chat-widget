import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
// STRIPE_PUBLIC_KEY;
// STRIPE_SECRET

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: "2025-12-15.clover",
});

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse("User not authenticated");

    const account = await stripe.accounts.create({
      country: "IN",
      type: "custom",
      business_type: "company",
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
      external_account: "btok_us",
    });

    if (account) {
      const approve = await stripe.accounts.update(account.id, {
        business_profile: {
          mcc: "5045",
          url: "https://best.com",
        },
        company: {
          address: {
            city: "Victoria",
            line1: "123 State",
            postal_code: "V8P 1A1",
            state: "BC",
          },
          tax_id: "000000000",
          name: "The Best Cookie Co",
          phone: "9001586400",
        },
      });
      if (approve) {
        const person = await stripe.accounts.createPerson(account.id, {
          first_name: "Jenny",
          last_name: "Rosen",
          relationship: {
            representative: true,
            title: "CEO",
          },
        });
        if (person) {
          const approvePerson = await stripe.accounts.updatePerson(
            account.id,
            person.id
          );

          if (approvePerson) {
            const owner = await stripe.accounts.createPerson(account.id, {
              first_name: "Ritik",
              last_name: "Chhipa",
            });
            if (owner) {
              const complete = await stripe.accounts.update(account.id, {
                company: {
                  owners_provided: true,
                },
              });
              if (complete) {
                const saveAccountId = await prisma.user.update({
                  where: {
                    clerkId: user.id,
                  },
                  data: {
                    stripeId: account.id,
                  },
                });

                if (saveAccountId) {
                  const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url:
                      "http://localhost:3000/callback/stripe/refersh",
                    return_url: "http://localhost:3000/callback/stripe/success",
                    type: "account_onboarding",
                    collection_options: {
                      fields: "currently_due",
                    },
                  });
                  return NextResponse.json({
                    url: accountLink.url,
                  });
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}
