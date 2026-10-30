import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "./FormField";

import { login, register, sendOtp } from "@/services/UserAPi/AuthApi";
import type { RegisterPayload } from "@/services/UserAPi/AuthApi";
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
  const [sendingOtp, setSendingOtp] = useState(false);
  const formSchema = authFormSchema(type);

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

  const handleSendOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (sendingOtp) return;

    const email = form.getValues("email");
    try {
      z.string().email("Enter a valid email").parse(email);
      setSendingOtp(true);
      const response = await sendOtp(email);
      if (response.status === 200) {
        localStorage.setItem("email", email);
        localStorage.setItem("otpSource", "sign-up");
        toast.success("OTP sent successfully");
        navigate("/otp-verify");
      } else {
        toast.error("Failed to send OTP. Try again later.");
      }
    } catch (error: any) {
      if (error?.errors?.[0]?.message) {
        toast.error(error.errors[0].message);
      } else {
        const message = error?.response?.data?.message || "Failed to send OTP. Please try again.";
        toast.error(message);
      }
    } finally {
      setSendingOtp(false);
    }
  };

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
        const response = await register(payload);
        if (response.status === 201) {
          localStorage.setItem("email", data.email);
          localStorage.setItem("otpSource", "sign-up");
          toast.success(response.data?.message || "Account created successfully. Please verify your email.");
          try {
            await sendOtp(data.email);
          } catch (e) {
            // ignore otp send errors, user can resend from otp page
          }
          navigate("/otp-verify");
        } else {
          toast.success("Account created successfully. Please verify your email.");
          navigate("/sign-in");
        }
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        {!isSignIn && (
          <FormField
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />
        )}

        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
          />

          {!isSignIn && (
            <Button
              type="button"
              variant="outline"
              onClick={handleSendOtp}
              className="w-full justify-center gap-2"
              disabled={sendingOtp || !form.getValues("email")}
            >
              {sendingOtp ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send OTP
                </>
              )}
            </Button>
          )}
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

        <Button className="w-full py-3" type="submit" disabled={isSubmitting}>
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
  );
};

export default AuthForm;