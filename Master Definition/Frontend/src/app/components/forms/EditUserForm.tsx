"use client";

import { useEffect, useState } from "react";

import { getUserDetailsById } from "@/app/lib/services/user/user";
import ReusableForm from "@/app/lib/ReusableForm";
import { registerSchema } from "@/app/lib/schemas/auth";

const EditUserForm = ({
  userToBeEditedRole,
  handleEditUser,
  departments,
  userId,
  isAdmin = false,
}: {
  userToBeEditedRole: string;
  handleEditUser: (values, { setSubmitting }) => void;
  departments: { value: string; label: string }[];
  userId: number;
  isAdmin: boolean;
}) => {
  console.log(departments);
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    image: "",
    phone: "",
    address: "",
    department: "",
    class: "",
  });

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
      label: "New Password",
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserDetailsById(userId);
        setInitialValues((prev) => ({
          ...prev,
          name: user.name,
          email: user.email,
          department: user.department || "",
          gender: user.gender,
          address: user.address,
          phone: user.phone,
          class: user.class || "",
          image: user.image,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const disabledFields = isAdmin ? [''] : ["department", "email"];

  return (
    <div className="flex flex-col justify-center gap-3 bg-yellow-50">
      {!loading && (
        <ReusableForm
          title={`Edit ${userToBeEditedRole} form`}
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleEditUser}
          fields={addUserFields}
          submitButtonText="Edit User"
          disabledFields={disabledFields}
        />
      )}
    </div>
  );
};

export default EditUserForm;
