"use client";

import ReusableForm from "@/app/lib/ReusableForm";
import { registerSchema } from "@/app/lib/schemas/auth";
import { registerUserInterface } from "@/app/lib/services/auth/authTypes";

interface addUserFormValues {
  name: string;
  email: string;
  password: string;
  gender: string;
  image: File | string;
  phone: string;
  grNumber: string;
  address: string;
  department: string;
  class: string;
}

const AddUserForm = ({
  userTobeAddedRole,
  handleAddUser,
  departments,
  isAdmin = false,
}: {
  userTobeAddedRole: string;
  handleAddUser: (
    values: registerUserInterface,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => void;
  departments: { value: string; label: string }[];
  isAdmin: boolean;
}) => {
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
      name: "grNumber",
      type: "text",
      label: "Gr number",
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
    grNumber: "",
    address: "",
    department: isAdmin ? "" : departments[0].value,
    class: "",
  };

  const disabledFields = isAdmin ? [] : ["department"];

  return (
    <div className="overflow-scroll no-scrollbar max-h-[90%] bg-white p-6 rounded-xl w-full  max-w-2xl">
      <ReusableForm
        title={`Add ${userTobeAddedRole} form`}
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleAddUser}
        fields={addUserFields}
        submitButtonText={`Add ${userTobeAddedRole}`}
        disabledFields={disabledFields}
      />
    </div>
  );
};

export default AddUserForm;
