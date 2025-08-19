"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { handleRegister } from "@/app/lib/services/auth/register";
import { getDepartments } from "@/app/lib/services/user/user";
import ReusableForm from "@/app/lib/ReusableForm";
import { registerSchema } from "@/app/lib/schemas/auth";

interface addUserFormValues {
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

const AddUserForm = ({
  userTobeAddedRole,
  handleAddUser,
  department,
}: {
  userTobeAddedRole: string;
  handleAddUser: (values, { setSubmitting }) => void;
  department: string;
}) => {
  const router = useRouter();
  const [departments, setDepartments] = useState([
    { value: department, label: department },
  ]);

  const addUserFields = [
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

  const initialValues: addUserFormValues = {
    name: "",
    email: "",
    password: "",
    gender: "",
    image: "",
    phone: "",
    address: "",
    department: department,
    class: "",
  };

  // useEffect(() => {
  //   const fetchDepartment = async () => {
  //     const data = await getDepartments();

  //     const formattedDepartments = data.map((department: string) => {
  //       return { value: department, label: department };
  //     });

  //     setDepartments((prev) => {
  //       return [...formattedDepartments];
  //     });
  //   };

  //   fetchDepartment();
  // }, []);

  return (
    <div className="flex flex-col justify-center gap-3 bg-yellow-50">
      <ReusableForm
        title={`Add ${userTobeAddedRole} form`}
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleAddUser}
        fields={addUserFields}
        submitButtonText="Add User"
        disabledFields={["department"]}
      />
    </div>
  );
};

export default AddUserForm;
