"use client";

import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { useChangePassword } from "@/hooks/sidebar/use-settings";
import FormGenerator from "@/components/forms/form-generator";
import Loader from "@/components/loader";

function PasswordSection() {
  const { errors, loading, register, onChangePassword } = useChangePassword();
  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      {/* Left Label */}
      <SectionLabel
        icon={Lock}
        label="Change password"
        description="Update your password to keep your account secure."
      />

      {/* Right Content */}
      <form
        onSubmit={onChangePassword}
        className="relative  p-4 overflow-hidden space-y-6"
      >
        <FormGenerator
          inputType="input"
          type="password"
          register={register}
          errors={errors}
          name="password"
          label="New Password"
          placeholder="Enter new password"
        />
        <FormGenerator
          inputType="input"
          type="password"
          register={register}
          errors={errors}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Enter confirm Password"
        />

        {/* Action */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Password must be at least 8 characters.
          </p>

          <Button
            type="submit"
            disabled={loading}
            className="bg-amber-400 text-black hover:bg-amber-500"
          >
            <Loader loading={loading}>Change Password</Loader>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PasswordSection;
