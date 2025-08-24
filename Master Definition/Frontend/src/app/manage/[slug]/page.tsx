"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getDepartments,
  updateUser,
} from "../../lib/services/user/user";
import { Button, Modal } from "@mui/material";
import { UserType } from "../../lib/definitions";
import AddUserForm from "../../components/forms/AddUser";
import EditUserForm from "../../components/forms/EditUserForm";
import { registerUserInterface } from "../../lib/services/auth/authTypes";
import { toast } from "react-toastify";

export default function Manage() {
  const { slug } = useParams();
  const role = slug as string;
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [addUserForm, setAddUserForm] = useState(false);
  const [editUserForm, setEditUserForm] = useState(false);
  const [currEditUserID, setCurrEditUserID] = useState(0);
  const [departments, setDepartments] = useState([{ value: "", label: "" }]);

  const fetchUsers = useCallback(async () => {
    if (session && session.user.role) {
      const response =
        session.user.role === "Admin"
          ? await getAllUsers(session.accessToken, {
              roleName: role,
            })
          : await getAllUsers(session.accessToken, {
              roleName: role,
              department: session.user.department,
            });

      if (response.success) {
        setUsers(response.data);
      } else {
        console.log(response.error);
      }
    }
  }, [session, role]);

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

  const handleDeleteUser = async (userId: number) => {
    if (session) {
      const result = await deleteUser(
        session.accessToken,
        userId,
        session.user.role
      );
      if (result.success) {
        toast.success(result.message || "User deleted successfully!");
        fetchUsers();
      } else {
        toast.error(result.error || "Failed to  delete student");
      }
    }
  };

  const handleAddUser = async (
    values: registerUserInterface,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): Promise<void> => {
    const result = await addUser(
      session.accessToken,
      session.user.role,
      values,
      role
    );
    if (result.success) {
      toast.success(result.message);
      fetchUsers();
      setAddUserForm(false);
    } else {
      console.log(result);
      toast.error(result.error || "Error in adding user");
    }
    setSubmitting(false);
  };
  const handleEditUser = async (
    values: registerUserInterface,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): Promise<void> => {
    if (session) {
      const result = await updateUser(
        session.accessToken,
        currEditUserID,
        session?.user.role,
        values
      );
      if (result.success) {
        toast.success(result.message);
        fetchUsers();
        setEditUserForm(false);
      } else {
        toast.error(result.error || "Error in edit user");
      }
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUsers();
      fetchDepartments();
    }
  }, [session, fetchUsers, fetchDepartments]);

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

  if (!role)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">No role found</div>
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h1 className="text-2xl">Manage {role}</h1>
              <Button onClick={() => setAddUserForm(true)} variant="contained">
                Add {role}
              </Button>
            </div>

            {users.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-lg mb-2">No {role}s found</div>
              </div>
            ) : (
              <div className="space-y-3">
                {users.map((user: UserType) => (
                  <div
                    key={user.id}
                    className="flex flex-col md:flex-row gap-3 items-center justify-between p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-medium text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p>{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-sm text-gray-500">
                          {user.department}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setCurrEditUserID(user.id);
                          setEditUserForm(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
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
          open={addUserForm}
          onClose={() => setAddUserForm(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(5px)",
          }}
        >
          <AddUserForm
            departments={departments}
            handleAddUser={handleAddUser}
            userTobeAddedRole={role}
            isAdmin={session.user.role === "Admin"}
          />
        </Modal>

        <Modal
          open={editUserForm}
          onClose={() => setEditUserForm(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(5px)",
          }}
        >
          <EditUserForm
            departments={departments}
            handleEditUser={handleEditUser}
            userToBeEditedRole={role}
            userId={currEditUserID}
            isAdmin={session.user.role === "Admin"}
          />
        </Modal>
      </div>
    </>
  );
}
