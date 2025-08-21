"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  createStudent,
  deleteStudent,
  fetchStudentsList,
  updateStudent,
} from "../lib/services/student/student";
import { Button, Modal } from "@mui/material";
import { toast } from "react-toastify";
import { UserType } from "../lib/definitions";
import AddUserForm from "../components/forms/AddUser";
import EditUserForm from "../components/forms/EditUserForm";
import { getDepartments } from "../lib/services/user/user";

export default function ManageStudent() {
  const { data: session, status } = useSession();
  const [students, setStudents] = useState([]);
  const [addUserForm, setAddUserForm] = useState(false);
  const [editUserForm, setEditUserForm] = useState(false);
  const [currEditUserID, setCurrEditUserID] = useState(0);
  const [departments, setDepartments] = useState([{ value: "", label: "" }]);

  const fetchStudents = async () => {
    if (session && session.user.role) {
      try {
        const response = await fetchStudentsList(
          session.accessToken,
          session.user.role
        );

        setStudents(response);
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
      fetchStudents();
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

  if (
    session.user.role !== "Faculty" &&
    session.user.role !== "Hod" &&
    session.user.role !== "Admin"
  )
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

  const handleDelete = async (studentId: number) => {
    const result = await deleteStudent(
      session.accessToken,
      studentId,
      session.user.role
    );
    if (result.success) {
      toast.success(result.message || "Student deleted successfully!");

      fetchStudents();
    } else {
      toast.error(result.error || "Failed to  delete student");
    }
  };

  const handleAddStudent = async (
    values,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): Promise<void> => {
    const result = await createStudent(
      session.accessToken,
      values,
      session.user.role
    );
    if (result.success) {
      toast.success(result.message);
      fetchStudents();
      setAddUserForm(false);
    } else {
      console.log(result);
      toast.error(result.error || "Error in adding user");
    }

    setSubmitting(false);
  };
  const handleEditStudent = async (
    values,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): Promise<void> => {
    const result = await updateStudent(
      session.accessToken,
      values,
      currEditUserID,
      session.user.role
    );
    if (result.success) {
      toast.success(result.message);
      fetchStudents();
      setEditUserForm(false);
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
              <h1 className="text-2xl">Manage Students</h1>
              <Button onClick={() => setAddUserForm(true)} variant="contained">
                Add Student
              </Button>
            </div>

            {students.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-lg mb-2">No students found</div>
              </div>
            ) : (
              <div className="space-y-3">
                {students.map((student: UserType) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-medium text-sm">
                          {student.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p>{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                        <p className="text-sm text-gray-500">
                          {student.department}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setCurrEditUserID(student.id);
                          setEditUserForm(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(student.id)}
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
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddUserForm
            departments={departments}
            handleAddUser={handleAddStudent}
            userTobeAddedRole="Student"
            isAdmin={session.user.role === "Admin"}
          />
        </Modal>

        <Modal
          open={editUserForm}
          onClose={() => setEditUserForm(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <EditUserForm
            departments={departments}
            handleEditUser={handleEditStudent}
            userToBeEditedRole="Student"
            userId={currEditUserID}
            isAdmin={session.user.role === "Admin"}
          />
        </Modal>
      </div>
    </>
  );
}
