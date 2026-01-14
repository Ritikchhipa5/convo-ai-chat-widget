"use client";

import PortalSteps from "@/components/forms/portal/portal-steps";
import { usePortal } from "@/hooks/portal/use-portal";
import { useEffect } from "react";

type Props = {
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
  type: "Appointment" | "Payment";
  domainId: string;
  customerId: string;
  email: string;
  bookings?:
    | {
        slot: string;
        date: Date;
      }[]
    | undefined;

  products?:
    | {
        name: string;
        price: number;
        image: string;
      }[]
    | undefined;
  amount?: number;
  stripeId?: string;
};

function PortalForm({
  bookings,
  domainId,
  customerId,
  questions,
  email,
  type,
  products,
  amount,
  stripeId,
}: Props) {
  const {
    step,
    onNext,
    onPrev,
    register,
    errors,
    onBookAppointment,
    date,
    loading,
    setDate,
    selectedSlot,
    onSelectedTimeSlot,
  } = usePortal(customerId, domainId, email);

  useEffect(() => {
    if (questions.every((question) => question.answered)) {
      onNext();
    }
  }, [questions]);
  return (
    <form
      className=" h-screen flex flex-col  mx-auto items-center justify-center"
      onSubmit={onBookAppointment}
    >
      <PortalSteps
        loading={loading}
        slot={selectedSlot}
        bookings={bookings}
        onSlot={onSelectedTimeSlot}
        date={date}
        onBooking={setDate}
        type={type}
        step={step}
        onNext={onNext}
        onPrev={onPrev}
        register={register}
        questions={questions}
        errors={errors}
        products={products}
        amount={amount}
        stripeId={stripeId}
      />
    </form>
  );
}

export default PortalForm;
