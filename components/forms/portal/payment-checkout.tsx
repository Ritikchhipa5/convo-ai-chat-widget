import React from "react";

type Props = {
  onPrev: () => void;
  onNext: () => void;
  amount?: number;
  products?:
    | {
        name: string;
        price: number;
        image: string;
      }[]
    | undefined;
  stripeId?: string;
};

function PaymentCheckout({
  onPrev,
  onNext,
  amount,
  products,
  stripeId,
}: Props) {
  return <div>PaymentCheckout</div>;
}

export default PaymentCheckout;
