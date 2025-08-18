"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { loginSchema } from "../lib/schemas/auth";
import ReusableForm from "../lib/ReusableForm";
import { Button } from "@mui/material";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();

  const loginFields = [
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

  return (
    <>
      <div className="flex flex-col h-screen justify-center gap-3">
        <ReusableForm
          title="Login form"
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
          fields={loginFields}
          submitButtonText="Login"
        />
        <Button variant="text" onClick={() => router.push("/forgot-password")}>
          Forgot Password
        </Button>
        <Button color="secondary" onClick={() => router.push("/register")}>
          Create account
        </Button>
      </div>
    </>
  );
};

export default LoginPage;
