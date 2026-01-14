import FormGenerator from "@/components/forms/form-generator";
import Loader from "@/components/loader";
import { SectionLabel } from "@/components/section-label";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Lock } from "lucide-react";

type Props = {
  id: string;
};

const BotSetting = ({ id }: Props) => {
  return null;

  // return (
  //   <form className="space-y-10" onSubmit={onSubmitFilterQuestions}>
  //     <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
  //       <SectionLabel
  //         icon={Lock}
  //         label="Bot training question"
  //         description="Update your password to keep your account secure."
  //       />

  //       <div className="flex gap-4 flex-col">
  //         <FormGenerator
  //           inputType="input"
  //           type="text"
  //           register={register}
  //           errors={errors}
  //           name="question"
  //           label="Question"
  //           placeholder={"Type your question"}
  //         />

  //         <div className="flex justify-end">
  //           <Button type="submit">
  //             <Loader loading={loading}>Create</Loader>
  //           </Button>
  //         </div>
  //       </div>
  //     </div>

  //     <Separator />
  //     <FilterQuestions questions={isQuestions} />
  //   </form>
  // );
};

const FilterQuestions = ({
  questions,
}: {
  questions: {
    question: string;
  }[];
}) => {
  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <SectionLabel
        icon={Lock}
        label="Questions"
        description="Update your password to keep your account secure."
      />

      {!questions.length ? (
        <p className="text-sm text-muted-foreground">No Question available </p>
      ) : (
        <Accordion type="single" collapsible>
          {questions?.map((questions, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{questions.question}</AccordionTrigger>
              {/* <AccordionContent>{questions.answer}</AccordionContent> */}
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};
export default BotSetting;
