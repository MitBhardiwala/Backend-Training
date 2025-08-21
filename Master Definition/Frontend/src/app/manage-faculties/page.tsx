"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserType } from "../lib/definitions";
import { Button, Modal } from "@mui/material";
import {
  createFaculty,
  deleteFaculty,
  fetchFacultysList,
  updateFaculty,
} from "../lib/services/faculty/faculty";
import { toast } from "react-toastify";
import AddUserForm from "../components/forms/AddUser";
import EditUserForm from "../components/forms/EditUserForm";
import { getDepartments } from "../lib/services/user/user";

export default function ManageFaculty() {
  const { data: session, status } = useSession();
  const [faculties, setFaculties] = useState([]);
  const [addFacultyForm, setAddFacultyForm] = useState(false);
  const [editFacultyForm, setEditFacultyForm] = useState(false);
  const [currEditFacultyId, setCurrEditFacultyId] = useState(0);
  const [departments, setDepartments] = useState([{ value: "", label: "" }]);

  const fetchFaculties = async () => {
    if (session) {
      try {
        const response = await fetchFacultysList(
          session.accessToken,
          session.user.role
        );
        setFaculties(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchDepartments = async () => {
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
  };

  useEffect(() => {
    if (session) {
      fetchFaculties();
      fetchDepartments();
    }
  }, [session]);

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

  if (session.user.role !== "Hod" && session.user.role !== "Admin")
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
  const handleDelete = async (facultyId: number) => {
    const result = await deleteFaculty(
      session.accessToken,
      facultyId,
      session.user.role
    );
    if (result.success) {
      toast.success(result.message || "Faculty deleted successfully!");

      fetchFaculties();
    } else {
      toast.error(result.error || "Failed to  delete faculty");
    }
  };

  const handleAddFaculty = async (
    values,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): Promise<void> => {
    const result = await createFaculty(
      session.accessToken,
      values,
      session.user.role
    );

    if (result.success) {
      toast.success(result.message || "Faculty added successfully");
      setAddFacultyForm(false);
      fetchFaculties();
    } else {
      toast.error(result.error || "Error in adding faculty");
    }

    setSubmitting(false);
  };

  const handleEditFaculty = async (
    values,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): Promise<void> => {
    const result = await updateFaculty(
      session.accessToken,
      values,
      currEditFacultyId,
      session.user.role
    );
    if (result.success) {
      toast.success(result.message);
      fetchFaculties();
      setEditFacultyForm(false);
    } else {
      toast.error(result.error || "Error in edit faculty");
    }

    setSubmitting(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl">Manage Faculties</h1>
              <Button
                onClick={() => setAddFacultyForm(true)}
                variant="contained"
              >
                Add Faculty
              </Button>
            </div>

            {faculties.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-lg mb-2">No faculties found</div>
              </div>
            ) : (
              <div className="space-y-3">
                {faculties.map((faculty: UserType) => (
                  <div
                    key={faculty.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-medium text-sm">
                          {faculty.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p>{faculty.name}</p>
                        <p className="text-sm text-gray-500">{faculty.email}</p>
                        <p className="text-sm text-gray-500">
                          {faculty.department}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setCurrEditFacultyId(faculty.id);
                          setEditFacultyForm(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(faculty.id)}
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
          open={addFacultyForm}
          onClose={() => setAddFacultyForm(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddUserForm
            departments={departments}
            handleAddUser={handleAddFaculty}
            userTobeAddedRole="Faculty"
            isAdmin={session.user.role === "Admin"}
          />
        </Modal>

        <Modal
          open={editFacultyForm}
          onClose={() => setEditFacultyForm(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <EditUserForm
            departments={departments}
            handleEditUser={handleEditFaculty}
            userToBeEditedRole="Faculty"
            userId={currEditFacultyId}
            isAdmin={session.user.role === "Admin"}
          />
        </Modal>
      </div>
    </>
  );
}
