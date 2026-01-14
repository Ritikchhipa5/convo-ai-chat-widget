"use client";

import AppDrawer from "@/components/drawer";
import FormGenerator from "@/components/forms/form-generator";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import UploadButton from "@/components/upload-button";
import useDomain from "@/hooks/sidebar/use-domain";
import { Plus } from "lucide-react";

type Props = {};

const DomainAdd = ({}: Props) => {
  const { register, errors, addDomainPending, onAddDomain } = useDomain();

  return (
    <>
      <AppDrawer
        title="Add your business domain"
        description="Add in your domain address to integrated your chat bot"
        onOpen={
          <Button>
            <Plus />
            New Domain
          </Button>
        }
      >
        {({ closeDrawer }) => (
          <Loader loading={addDomainPending}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await onAddDomain();
                closeDrawer();
              }}
              className="max-w-xl mx-auto space-y-4 pb-10"
            >
              <FormGenerator
                inputType="input"
                register={register}
                label="Domain"
                name="domain"
                errors={errors}
                placeholder="https://example.com"
                type="text"
              />
              <FormGenerator
                inputType="textarea"
                register={register}
                label="About domain"
                name="description"
                errors={errors}
                placeholder="Write about your domain"
                type="text"
              />
              <UploadButton
                errors={errors}
                register={register}
                label="Upload Icon"
              />
              <Button type="submit" className="w-full">
                Add Domain
              </Button>
            </form>
          </Loader>
        )}
      </AppDrawer>
    </>
  );
};

export default DomainAdd;
