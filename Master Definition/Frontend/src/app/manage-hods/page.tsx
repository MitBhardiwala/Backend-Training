"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import {
  createHod,
  deleteHod,
  fetchHodsList,
  updateHod,
} from "../lib/services/hod/hod";
import { UserType } from "../lib/definitions";
import { Button, Modal } from "@mui/material";
import { toast } from "react-toastify";
import AddUserForm from "../components/forms/AddUser";
import EditUserForm from "../components/forms/EditUserForm";
import { getDepartments } from "../lib/services/user/user";
import { registerUserInterface } from "../lib/services/auth/authTypes";

export default function ManageHod() {
  const { data: session, status } = useSession();
  const [hods, setHods] = useState([]);
  const [addHodForm, setAddHodForm] = useState(false);
  const [editHodForm, setEditHodForm] = useState(false);
  const [currEditHodID, setCurrEditHodID] = useState(0);
  const [departments, setDepartments] = useState([{ value: "", label: "" }]);
  const fetchHods = useCallback(async () => {
    if (session) {
      try {
        const response = await fetchHodsList(session.accessToken);
        setHods(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, [session]);

  const fetchDepartments = useCallback(async () => {
    if (session && session.user.role !== "Admin" && session.user.department) {
      setDepartments([
        {
          value: session.user.department,
          label: session.user.department,
        },
      ]);
    } else {
      const data = await getDepartments();

      const formattedDepartments = data.map((department: string) => {
        return { value: department, label: department };
      });

      setDepartments(formattedDepartments);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchHods();
      fetchDepartments();
    }
  }, [session, fetchHods, fetchDepartments]);

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

  if (session.user.role !== "Admin")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Unauthorized User</div>
      </div>
    );

  if (!session.user.department && session.user.role !== "Admin")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">
          No department has been assigned, please contact admin
        </div>
      </div>
    );
  const handleDelete = async (hodId: number) => {
    const result = await deleteHod(session.accessToken, hodId);
    if (result.success) {
      toast.success(result.message || "Hod deleted successfully!");

      fetchHods();
    } else {
      toast.error(result.error || "Failed to  delete Hod");
    }
  };

  const handleAddHod = async (
    values: registerUserInterface,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): Promise<void> => {
    const result = await createHod(session.accessToken, values);
    if (result.success) {
      toast.success(result.message);
      fetchHods();
      setAddHodForm(false);
    } else {
      console.log(result);
      toast.error(result.error || "Error in adding Hod");
    }

    setSubmitting(false);
  };
  const handleEditStudent = async (
    values: registerUserInterface,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): Promise<void> => {
    const result = await updateHod(session.accessToken, values, currEditHodID);
    if (result.success) {
      toast.success(result.message);
      fetchHods();
      setEditHodForm(false);
    } else {
      toast.error(result.error || "Error in edit user");
    }

    setSubmitting(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl">Manage Hods</h1>
              <Button onClick={() => setAddHodForm(true)} variant="contained">
                Add Hod
              </Button>
            </div>

            {hods.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-lg mb-2">No hods found</div>
              </div>
            ) : (
              <div className="space-y-3">
                {hods.map((hod: UserType) => (
                  <div
                    key={hod.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-medium text-sm">
                          {hod.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p>{hod.name}</p>
                        <p className="text-sm text-gray-500">{hod.email}</p>
                        <p className="text-sm text-gray-500">
                          {hod.department}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setCurrEditHodID(hod.id);
                          setEditHodForm(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(hod.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Modal
          open={addHodForm}
          onClose={() => setAddHodForm(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(5px)",
          }}
        >
          <AddUserForm
            departments={departments}
            handleAddUser={handleAddHod}
            userTobeAddedRole="Hod"
            isAdmin={session.user.role === "Admin"}
          />
        </Modal>

        <Modal
          open={editHodForm}
          onClose={() => setEditHodForm(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(5px)",
          }}
        >
          <EditUserForm
            departments={departments}
            handleEditUser={handleEditStudent}
            userToBeEditedRole="Hod"
            userId={currEditHodID}
            isAdmin={session.user.role === "Admin"}
          />
        </Modal>
      </div>
    </>
  );
}
