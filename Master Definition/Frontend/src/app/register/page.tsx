"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { registerSchema } from "../schemas/auth";
import { handleRegister } from "../lib/services/auth/register";
import ReusableForm from "../components/layout/ReusableForm";

// Type definitions for Register form
interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  gender: string;
  image: File | string;
  phone: string;
  address: string;
  department: string;
  class: string;
}

interface SelectFieldConfig {
  name: string;
  type: "select";
  label: string;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
}

interface FileFieldConfig {
  name: string;
  type: "file";
  label: string;
  accept?: string;
}

interface BasicFieldConfig {
  name: string;
  type: "text" | "password" | "number";
  label: string;
}

type RegisterFieldConfig =
  | BasicFieldConfig
  | SelectFieldConfig
  | FileFieldConfig;

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const registerFields: RegisterFieldConfig[] = [
    {
      name: "name",
      type: "text",
      label: "Name",
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
      name: "phone",
      type: "number",
      label: "Phone",
    },
    {
      name: "image",
      type: "file",
      label: "Upload File",
      accept: "image/*",
    },
    {
      name: "address",
      type: "text",
      label: "Address",
    },
    {
      name: "class",
      type: "text",
      label: "Class",
    },
    {
      name: "department",
      type: "text",
      label: "Department",
    },
    {
      name: "gender",
      type: "select",
      label: "Select Gender",
      options: [
        { value: "", label: "Select gender", disabled: true },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
  ];

  const handleRegisterSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): Promise<void> => {
    const result = await handleRegister(values);
    if (result.success) {
      toast.success(result.message);
      router.push("/");
    } else {
      toast.error(result.error);
    }
    setSubmitting(false);
  };

  const initialValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
    gender: "",
    image: "",
    phone: "",
    address: "",
    department: "",
    class: "",
  };

  return (
    <ReusableForm
      title="Register form"
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleRegisterSubmit}
      fields={registerFields}
      submitButtonText="Register"
      additionalButtons={[
        { href: "/login", text: "Sign in", color: "secondary" },
      ]}
    />
  );
};

export default RegisterPage;
