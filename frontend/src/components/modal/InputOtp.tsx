/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOtp } from '@/services/UserAPi/AuthApi';
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
interface inputOtpProps {
  email: string;
  setOpen?: any;
  setEmailVerified: any;
}

const InputOtp = ({ email, setOpen, setEmailVerified }: inputOtpProps) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    setLoading(true);
    verifyOtp(email,value)
      .then((response) => {
        setLoading(false);
        toast.success(response.data.message);
        setEmailVerified(true);
        setOpen(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="flex flex-col">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      {loading ? (
        <Button className="mt-4" disabled>
          Loading...
        </Button>
      ) : (
        <Button className="mt-4" onClick={handleSubmit} type="button">
          Submit
        </Button>
      )}
    </div>
  );
};

export default InputOtp;
