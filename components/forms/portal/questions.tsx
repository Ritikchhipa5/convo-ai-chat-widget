"use client";

import FormGenerator from "@/components/forms/form-generator";
import { Button } from "@/components/ui/button";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  onNext: () => void;
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
};

function QuestionsForm({ register, errors, questions, onNext }: Props) {
  return (
    <div>
      <div>Account Details</div>
      {questions?.map((question) => (
        <FormGenerator
          defaultValue={question.answered || ""}
          key={question.id}
          name={`question-${question.id}`}
          register={register}
          errors={errors}
          label={question.question}
          type="text"
          inputType="input"
          placeholder={question.answered || "Not answered"}
        />
      ))}
      <Button type="button" onClick={onNext}>
        Next
      </Button>
    </div>
  );
}
export default QuestionsForm;
