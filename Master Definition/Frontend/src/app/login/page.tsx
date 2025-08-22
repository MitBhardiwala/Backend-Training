"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { loginSchema } from "../lib/schemas/auth";
import ReusableForm from "../lib/ReusableForm";

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

  const additionalButtons = [
    {
      text: "forgot password",
      variant: "text",
      link: "/forgot-password",
    },
    {
      text: "create account",
      color: "secondary",
      link: "/register",
    },
  ];

  return (
    <>
      <div className="h-[86vh] flex flex-col justify-center items-center">
        <ReusableForm
          title="Login form"
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
          fields={loginFields}
          submitButtonText="Login"
          additionalButtons={additionalButtons}
        />
      </div>
    </>
  );
};

export default LoginPage;
