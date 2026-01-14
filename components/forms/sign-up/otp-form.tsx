import FormHeading from "@/components/forms/form-heading";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
};

function OtpForm({ setOtp, otp }: Props) {
  return (
    <>
      <FormHeading
        title="Enter OTP"
        description="Enter otp we will sent to you on your email."
      />

      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
          <div className="flex gap-4">
            <div>
              <InputOTPSlot index={0} />
            </div>
            <div>
              <InputOTPSlot index={1} />
            </div>
            <div>
              <InputOTPSlot index={2} />
            </div>
            <div>
              <InputOTPSlot index={3} />
            </div>
            <div>
              <InputOTPSlot index={4} />
            </div>
            <div>
              <InputOTPSlot index={6} />
            </div>
          </div>
        </InputOTP>
      </div>
    </>
  );
}

export default OtpForm;
