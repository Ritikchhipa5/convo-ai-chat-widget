import BookAppointmentDate from "@/components/forms/portal/book-appointment-date";
import PaymentCheckout from "@/components/forms/portal/payment-checkout";
import QuestionsForm from "@/components/forms/portal/questions";
import { Dispatch, SetStateAction } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
  type: "Appointment" | "Payment";
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  onNext: () => void;
  onPrev: () => void;
  step: number;
  date: Date | undefined;
  onBooking: Dispatch<SetStateAction<Date | undefined>>;
  onSlot(slot: string): void;
  slot?: string;
  loading: boolean;
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

function PortalSteps({
  questions,
  type,
  register,
  errors,
  onNext,
  onPrev,
  step,
  date,
  onBooking,
  onSlot,
  slot,
  loading,
  bookings,
  products,
  amount,
  stripeId,
}: Props) {
  if (step === 1) {
    return (
      <QuestionsForm
        register={register}
        errors={errors}
        onNext={onNext}
        questions={questions}
      />
    );
  }

  if (step === 2 && type === "Appointment") {
    return (
      <BookAppointmentDate
        date={date}
        bookings={bookings}
        currentSlot={slot}
        register={register}
        onPrev={onPrev}
        onBooking={onBooking}
        onSlot={onSlot}
        loading={loading}
      />
    );
  }
  // if (step === 3 && type === "Payment") {
  //   return (
  //     <PaymentCheckout
  //       onPrev={onPrev}
  //       onNext={onNext}
  //       amount={amount}
  //       products={products}
  //       stripeId={stripeId}
  //     />
  //   );
  // }
  return <div>PortalSteps</div>;
}

export default PortalSteps;
