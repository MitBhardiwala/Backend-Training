"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { emailSchema, forgotPasswordSchema } from "../lib/schemas/auth";
import { sendOtp, verifyOtp } from "../lib/services/auth/forgotPassword";
import ReusableForm from "../lib/ReusableForm";
import { Button } from "@mui/material";

interface ForgotPasswordFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
}

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);

  const emailFields = [
    {
      name: "email-label",
      type: "label",
      text: "Enter your registered email address:",
      targetField: "email",
    },
    {
      name: "email",
      type: "text",
      label: "Email",
    },
  ];

  const resetFields = [
    {
      name: "email-label",
      type: "label",
      text: "Enter your registered email address:",
      targetField: "email",
    },
    {
      name: "email",
      type: "text",
      label: "Email",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
    },
    {
      name: "otp",
      type: "number",
      label: "Otp",
    },
  ];

  const handleForgotPassword = async (
    values: ForgotPasswordFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): Promise<void> => {
    if (isOtpSent) {
      const result = await verifyOtp(values);
      if (result.success) {
        toast.success(result.message);
        router.push("/login");
      } else {
        toast.error(result.error);
      }
    } else {
      const result = await sendOtp(values.email);
      if (result.success) {
        toast.success(result.message);
        setIsOtpSent(true);
      } else {
        toast.error(result.error);
      }
    }
    setSubmitting(false);
  };

  const initialValues: ForgotPasswordFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  };

  return (
    <div className="flex flex-col h-screen justify-center gap-3">
      <ReusableForm
        title="Forgot password form"
        initialValues={initialValues}
        validationSchema={isOtpSent ? forgotPasswordSchema : emailSchema}
        onSubmit={handleForgotPassword}
        fields={isOtpSent ? resetFields : emailFields}
        submitButtonText={isOtpSent ? "Confirm Password" : "Send Otp"}
      />
      <Button variant="text" onClick={() => router.push("/login")}>
        Login
      </Button>
    </div>
  );
};

export default ForgotPasswordPage;
