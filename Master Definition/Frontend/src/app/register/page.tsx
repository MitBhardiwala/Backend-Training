"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { registerSchema } from "../lib/schemas/auth";
import { handleRegister } from "../lib/services/auth/register";
import ReusableForm from "../lib/ReusableForm";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getDepartments } from "../lib/services/user/user";

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

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [departments, setDepartments] = useState([
    { value: "", label: "Select Department", disabled: true },
  ]);

  const registerFields = [
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
      type: "select",
      label: "Select Department",
      options: departments,
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

  const additionalButtons = [
    {
      text: "login",
      color: "secondary",
      link: "/login",
    },
  ];

  useEffect(() => {
    const fetchDepartment = async () => {
      const data = await getDepartments();

      const formattedDepartments = data.map((department: string) => {
        return { value: department, label: department };
      });

      setDepartments((prev) => {
        return [...formattedDepartments];
      });
    };

    fetchDepartment();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center gap-3">
      <ReusableForm
        title="Register form"
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleRegisterSubmit}
        fields={registerFields}
        submitButtonText="Register"
        additionalButtons={additionalButtons}
      />
    </div>
  );
};

export default RegisterPage;
