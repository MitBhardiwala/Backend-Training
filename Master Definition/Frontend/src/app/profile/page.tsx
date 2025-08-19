"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserDetails, updateUserProfile } from "../lib/services/user/user";
import ReusableForm from "../lib/ReusableForm";
import { registerSchema, updateProfileSchema } from "../lib/schemas/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface UserProfileValues {
  name: string;
  email: string;
  gender: string;
  image: File | string;
  phone: string;
  address: string;
  department: string;
  class: string;
}

export default function ProfilePage({}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    gender: "",
    image: "",
    phone: "",
    address: "",
    department: "",
    class: "",
  });

  const userProfileFields = [
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

  const handleProfileUpdate = async (
    values: UserProfileValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): Promise<void> => {
    const { email, department, ...updatedUser } = values;
    const result = await updateUserProfile(session.accessToken, updatedUser);
    if (result.success) {
      toast.success(result.message);
      router.push("/");
    } else {
      toast.error(result.error);
    }

    console.log(updatedUser);
    setSubmitting(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await getUserDetails(session.accessToken);
        const { id, role, roleId, grNumber, ...user } = userDetails;
        setInitialValues(user);
      } catch (error) {
        console.log(error);
      }
    };
    if (session) {
      fetchUser();
    }
  }, [session]);

  if (status === "loading") return <div>Loading. ..</div>;

  if (!session) return <div>No session token found</div>;

  return (
    <>
      <div className="flex flex-col h-screen justify-center gap-3">
        <ReusableForm
          title="Update Profile"
          initialValues={initialValues}
          validationSchema={updateProfileSchema}
          onSubmit={handleProfileUpdate}
          fields={userProfileFields}
          submitButtonText="Update Profile"
          disabledFields={['password','department','email']}
        />
      </div>
    </>
  );
}
