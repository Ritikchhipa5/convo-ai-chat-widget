"use client";
import { onBookNewAppointment, saveAnswers } from "@/actions/appointment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const usePortal = (
  customerId: string,
  domainId: string,
  email: string
) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>("");

  const {
    register,

    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  setValue("date", date);

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const onPrev = () => {
    setStep((prev) => prev - 1);
  };

  const onBookAppointment = handleSubmit(async (values) => {
    try {
      setLoading(true);

      const questions = Object.keys(values)
        .filter((key) => key.startsWith("question"))
        .reduce((obj: any, key) => {
          obj[key.split("question-")[1]] = values[key];
          return obj;
        }, {});

      const savedAnswers = await saveAnswers(questions, customerId);

      if (savedAnswers) {
        const booked = await onBookNewAppointment(
          domainId,
          customerId,
          values.slot,
          values.date,
          email
        );
        if (booked && booked.status === 200) {
          setLoading(false);
          toast("Success", {
            description: booked.message,
          });
          setStep(3);
        }
        setLoading(false);
      }
      // Booking logic here
    } catch (error) {
      console.log(error);
    }
  });

  const onSelectedTimeSlot = (slot: string) => {
    setSelectedSlot(slot);
  };

  return {
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
  };
};
