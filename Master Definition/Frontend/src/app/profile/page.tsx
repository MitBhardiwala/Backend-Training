"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserDetails, updateUserProfile } from "../lib/services/user/user";
import ReusableForm from "../lib/ReusableForm";
import { updateProfileSchema } from "../lib/schemas/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { removeNullValues } from "../lib/utils";

interface UserProfileValues {
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

export default function ProfilePage({}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    grNumber: "",
    image: "",
    address: "",
    class: "",
    department: "",
    gender: "",
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
      name: "grNumber",
      type: "number",
      label: "Gr Number",
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
    if (session) {
      try {
        const { email, department, ...updatedUser } = values;

        const result = await updateUserProfile(
          session.accessToken,
          updatedUser
        );
        if (result.success) {
          toast.success(result.message);
          router.push("/");
        } else {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error("An error occurred while updating profile");
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        try {
          const userDetails = await getUserDetails(session.accessToken);

          const { id, role, roleId, ...user } = userDetails;

          const filterData = removeNullValues(user);

          setInitialValues({ ...initialValues, ...filterData });
        } catch (error) {
          console.log(error);
          toast.error("Failed to load user details");
        }
      }
    };
    if (session) {
      fetchUser();
    }
  }, [session, initialValues]);

  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );

  if (!session)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">No session token found</div>
      </div>
    );

  return (
    <>
      <div className="flex flex-col justify-center gap-3 items-center h-full ">
        <ReusableForm
          title="Update Profile"
          initialValues={initialValues}
          validationSchema={updateProfileSchema}
          onSubmit={handleProfileUpdate}
          fields={userProfileFields}
          submitButtonText="Update Profile"
          disabledFields={["email", "department"]}
        />
      </div>
    </>
  );
}
