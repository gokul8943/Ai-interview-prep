import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "./FormField";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import InputOtp from "./modal/InputOtp";

import { login, register } from "@/services/UserAPi/AuthApi";
import type { RegisterPayload } from "@/services/UserAPi/AuthApi";
import LogoSvg from "@/public/logo.svg";
import useAuthStore from "@/store/AuthStrore";

type FormType = "sign-in" | "sign-up";

const normalizePhone = (value: string) => value.replace(/[\s()-]/g, "");

const authFormSchema = (type: FormType) =>
  z.object({
    name: type === "sign-up" ? z.string().min(1, "Name is required") : z.string().optional(),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phone: type === "sign-up"
      ? z
          .string()
          .optional()
          .refine(
            (val) => !val || /^\+[1-9]\d{6,14}$/.test(normalizePhone(val)),
            "Use international format, e.g. +15551234567"
          )
      : z.string().optional(),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formSchema = authFormSchema(type);

  // const [open, setOpen] = useState(false);
  // const [emailVerified, setEmailVerified] = useState(false);
  // const [sendingOtp, setSendingOtp] = useState(false); // prevent multiple OTP requests

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const isSignIn = type === "sign-in";

  // const handleSendOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   // Prevent multiple OTP sends
  //   if (sendingOtp) return;

  //   const email = form.getValues("email");

  //   try {
  //     z.string().email().parse(email);

  //     setSendingOtp(true);
  //     const response = await sendOtp(email);

  //     if (response.status === 200) {
  //       toast.success("OTP sent successfully");
  //       setOpen(true);
  //     } else {
  //       toast.error("Failed to send OTP. Try again later.");
  //     }
  //   } catch (error) {
  //     if (error instanceof ZodError) {
  //       toast.error(error.errors[0].message);
  //     } else {
  //       toast.error("Failed to send OTP. Please try again.");
  //     }
  //   } finally {
  //     setSendingOtp(false);
  //   }
  // };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (isSignIn) {
        const response = await login(data);
        if (response.status === 200) {
          const { accessToken, user } = response.data;
          useAuthStore.getState().login(accessToken, user);
          toast.success("Logged in successfully.");
          navigate("/");
        }
      } else {
        const payload: RegisterPayload = {
          name: data.name ?? "",
          email: data.email,
          password: data.password,
        };
        if (data.phone) {
          payload.phone = normalizePhone(data.phone);
        }
        await register(payload);
        toast.success("Account created successfully. Please sign in.");
        navigate("/sign-in");
      }
    } catch (error: unknown) {
      console.error(error);
      const message =
        (error as { response?: { data?: { message?: string } }; message?: string })?.response?.data
          ?.message ||
        (error as { message?: string })?.message ||
        "Something went wrong";
      toast.error(`There was an error: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const mail = form.getValues("email");

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex justify-center gap-2">
          <img src={LogoSvg} alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">IntelliPrep</h2>
        </div>
        <h3 className="text-primary-100">Practice Job Interview with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <div className="flex justify-between items-end gap-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Your email address"
                  type="email"
                  // disabled={emailVerified} // disable after verification
                />
              </div>

              {/* {!isSignIn && (
                <Button
                  type="button"
                  onClick={handleSendOtp}
                  className={`h-[42px] rounded-2xl ${
                    emailVerified ? "bg-green-500 text-white" : "bg-blue-200 text-black"
                  }`}
                  disabled={sendingOtp || emailVerified}
                >
                  {sendingOtp
                    ? "Sending..."
                    : emailVerified
                    ? "Verified"
                    : "Verify"}
                </Button>
              )} */}
            </div>

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            {!isSignIn && (
              <FormField
                control={form.control}
                name="phone"
                label="Phone (optional)"
                placeholder="+15551234567"
                type="tel"
              />
            )}

            <Button className="btn" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? isSignIn
                  ? "Signing In..."
                  : "Creating Account..."
                : isSignIn
                ? "Sign In"
                : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            to={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>

        {/* <h1 className="flex justify-center text-slate-300 font-base">OR</h1>
        <div className="flex justify-center">
          <Button className="border">
            <FcGoogle />
            Login with Google
          </Button>
        </div> */}
      </div>

      {/* OTP Dialog for Sign-Up only */}
      {/* {!isSignIn && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px] bg-gradient-to-tl from-black to-blue-800">
            <DialogHeader>
              <DialogTitle className="text-primary-100">Email Verification</DialogTitle>
              <DialogDescription className="text-primary-100">
                Enter the OTP sent to your email address.
              </DialogDescription>
            </DialogHeader>
            <div className="w-full flex justify-center text-primary-100">
              <InputOtp
                setEmailVerified={setEmailVerified}
                setOpen={setOpen}
                email={mail}
              />
            </div>
            <DialogFooter />
          </DialogContent>
        </Dialog>
      )} */}
    </div>
  );
};

export default AuthForm;
