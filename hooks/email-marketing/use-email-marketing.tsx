"use client";

import {
  onAddCustomerToEmail,
  onBulkMailer,
  onCreateMarketingCampaign,
  onGetAllCustomerResponse,
  onGetEmailTemplate,
  onSaveEmailTemplate,
} from "@/actions/mail";
import {
  EmailMarketingBodySchema,
  EmailMarketingSchema,
  EmailMarketingType,
} from "@/schemas/email-marketing.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useEmailMarketing = () => {
  const [isSelected, setIsSelected] = useState<string[]>([]);
  const [campaignId, setCampaignId] = useState<string | undefined>();
  const [processing, setProcessing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isId, setIsId] = useState<string | undefined>();
  const [editing, setEditing] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(EmailMarketingSchema),
  });

  const {
    register: registerMail,
    formState: { errors: emailErrors },

    handleSubmit: emailHandleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(EmailMarketingBodySchema),
  });

  const onCreateCampaign = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const campaign = await onCreateMarketingCampaign(values.name);

      if (campaign) {
        reset();
        toast("Success", {
          description: "Campaign created successfully",
        });
        setLoading(false);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  });

  const onCreateEmailTemplate = emailHandleSubmit(async (values) => {
    try {
      setEditing(true);

      const template = JSON.stringify(values.description);
      const emailTemplate = await onSaveEmailTemplate(template, campaignId!);

      if (emailTemplate) {
        reset();
        toast("Success", {
          description: emailTemplate.message,
        });
        setEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  });

  const onSelectCampaign = (id: string) => {
    setCampaignId(id);
  };

  const onAddCustomerToCampaign = async () => {
    try {
      setProcessing(true);
      const customerAdd = await onAddCustomerToEmail(isSelected, campaignId!);

      if (customerAdd) {
        toast("Success", {
          description: "Customers added to campaign successfully",
        });
        setProcessing(false);
        setCampaignId(undefined);
        router.refresh();
      }
      setProcessing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectedEmails = (email: string) => {
    const duplicate = isSelected.find((e) => e === email);
    if (duplicate) {
      const filterEmails = isSelected.filter((e) => e !== email);
      setIsSelected(filterEmails);
    } else {
      setIsSelected((prev) => [...prev, email]);
    }
  };

  const onBulkEmail = async (emails: string[], campaignId: string) => {
    try {
      const mails = await onBulkMailer(emails, campaignId);
      if (mails) {
        toast("Success", {
          description: "Bulk emails sent successfully",
        });
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const onSetAnswersId = (id: string) => setIsId(id);
  return {
    onSelectedEmails,
    isSelected,
    onCreateCampaign,
    register,
    errors,
    loading,
    onSelectCampaign,
    processing,
    campaignId,
    onAddCustomerToCampaign,
    onBulkEmail,
    onSetAnswersId,
    isId,
    registerMail,
    emailErrors,
    editing,
    setValue,
    onCreateEmailTemplate,
  };
};

export const useAnswers = (id: string) => {
  const [answers, setAnswers] = useState<
    {
      customer: {
        questions: {
          question: string;
          answered: string | null;
        }[];
      }[];
    }[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);

  const onGetCustomerAnswers = async () => {
    try {
      setLoading(true);
      const answer = await onGetAllCustomerResponse(id);
      setLoading(false);
      if (answer) {
        setAnswers(answer.domains);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetCustomerAnswers();
  }, []);

  return { answers, loading };
};

export const useEditEmail = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [template, setTemplate] = useState<string>("");

  const onGetTemplate = async (id: string) => {
    try {
      setLoading(true);
      const emailTemplate = await onGetEmailTemplate(id);

      if (emailTemplate) {
        setTemplate(emailTemplate);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetTemplate(id);
  }, []);

  return { loading, template };
};
