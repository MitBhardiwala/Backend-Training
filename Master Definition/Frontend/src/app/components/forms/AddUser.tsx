"use client";

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
  departments,
  isAdmin = false,
}: {
  userTobeAddedRole: string;
  handleAddUser: (values, { setSubmitting }) => void;
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
    department: isAdmin ? "" : departments[0].value,
    class: "",
  };

  const disabledFields = isAdmin ? [] : ["department"];

  return (
    <div className="flex flex-col justify-center gap-3 bg-yellow-50">
      <ReusableForm
        title={`Add ${userTobeAddedRole} form`}
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleAddUser}
        fields={addUserFields}
        submitButtonText="Add User"
        disabledFields={disabledFields}
      />
    </div>
  );
};

export default AddUserForm;
