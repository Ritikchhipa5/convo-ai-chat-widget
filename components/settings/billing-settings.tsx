import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Plus, CreditCard, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { pricingCards } from "@/constants/landing-page";

export async function BillingSettings() {
  const plan = "Plus";

  const isPro = plan === "Plus";

  const planFeatures = pricingCards.find(
    (card) => card.title.toUpperCase() === plan?.toUpperCase()
  );

  if (!planFeatures) return;
  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      {/* Left Label */}
      <SectionLabel
        icon={DollarSign}
        label="Billing settings"
        description="Add payment information, upgrade and modify your plan."
      />

      {/* Right Content */}
      <div className="space-y-8    p-4 ">
        {/* Upgrade + Current Plan */}
        <Card className="border-none shadow-none p-0 bg-transparent ">
          <CardContent className="p-0">
            <div className="grid gap-6  lg:grid-cols-[1fr_260px]">
              <div className="relative rounded-xl  w-full max-w-xs overflow-hidden  sm:max-w-sm">
                {/* Glow */}
                {isPro && (
                  <div className="absolute inset-0 rounded-xl bg-linear-to-br from-amber-400/40 via-orange-400/30 to-pink-400/30 blur-xl" />
                )}

                <div
                  className={cn(
                    "relative h-52 w-full rounded-xl overflow-hidden transition-all",
                    isPro
                      ? "bg-linear-to-br from-amber-400  via-orange-400 to-pink-500 text-white shadow-lg"
                      : "border border-dashed bg-muted/50 border-muted-foreground/30 flex items-center justify-center"
                  )}
                >
                  {/* PRO CARD */}
                  {isPro ? (
                    <div className="flex h-full rounded-xl   flex-col justify-between p-4 sm:p-5 backdrop-blur-sm">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <CreditCard className="h-5 w-5 opacity-90" />
                        <span className="text-xs sm:text-sm font-semibold tracking-wide">
                          {plan}
                        </span>
                      </div>

                      {/* Card Number */}
                      <div className="space-y-1">
                        <p className="text-base sm:text-lg font-semibold tracking-widest">
                          •••• •••• •••• 2538
                        </p>
                        <p className="text-[10px] sm:text-xs opacity-90">
                          Valid till 02/2028
                        </p>
                      </div>

                      {/* Footer */}
                      <p className="text-[10px] capitalize sm:text-xs font-medium opacity-90">
                        {plan} Plan Active
                      </p>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 text-sm"
                    >
                      <Plus className="h-4 w-4" />
                      Upgrade Plan
                    </Button>
                  )}
                </div>
              </div>

              {/* Current Plan */}
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase text-muted-foreground">
                  Current Plan
                </p>

                <p
                  className={cn(
                    "text-lg font-semibold",
                    isPro && "text-amber-400"
                  )}
                >
                  {plan}
                </p>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  {planFeatures?.features.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
