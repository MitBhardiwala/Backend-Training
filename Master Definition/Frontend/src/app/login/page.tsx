"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { loginSchema } from "../schemas/auth";
import ReusableForm from "../components/layout/ReusableForm";

interface LoginFormValues {
  email: string;
  password: string;
}

interface FieldConfig {
  name: string;
  type: string;
  label: string;
}

interface AdditionalButton {
  href: string;
  text: string;
  variant?: "text" | "outlined" | "contained";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
}

const LoginPage: React.FC = () => {
  const router = useRouter();

  const loginFields: FieldConfig[] = [
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
  ];

  const handleLogin = async (
    values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): Promise<void> => {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result && result.error) {
      toast.error(result.error.split(":")[1]);
    } else {
      toast.success("Login successful!");
      router.push("/");
    }
    setSubmitting(false);
  };

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const additionalButtons: AdditionalButton[] = [
    { href: "/forgot-password", text: "Forgot password", variant: "text" },
    { href: "/register", text: "Create Account", color: "secondary" },
  ];

  return (
    <ReusableForm
      title="Login form"
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
      fields={loginFields}
      submitButtonText="Login"
      additionalButtons={additionalButtons}
    />
  );
};

export default LoginPage;
