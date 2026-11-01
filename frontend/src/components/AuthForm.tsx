import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormField from "./FormField";

import { login, register } from "@/services/UserAPi/AuthApi";
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
        const payload = {
          name: data.name ?? "",
          email: data.email,
          password: data.password,
        };
        if (data.phone) {
          payload.phone = normalizePhone(data.phone);
        }
        const response = await register(payload);
        if (response.status === 201) {
          toast.success("Account created successfully.");
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
              : "Signing Up..."
            : isSignIn
            ? "Sign In"
            : "Sign Up"}
        </Button>

        <p className="text-center text-sm text-slate-600">
          {isSignIn ? (
            <>
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-blue-600 hover:underline font-medium">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/sign-in" className="text-blue-600 hover:underline font-medium">
                Sign In
              </Link>
            </>
          )}
        </p>
      </form>
    </Form>
  );
};

export default AuthForm;