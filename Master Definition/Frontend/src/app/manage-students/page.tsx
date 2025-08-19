"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  createStudent,
  deleteStudent,
  fetchStudentsList,
  updateStudent,
} from "../lib/services/faculty/faculty";
import { Button, Modal } from "@mui/material";
import { toast } from "react-toastify";
import { UserType } from "../lib/definitions";
import AddUserForm from "../components/forms/AddUser";
import EditUserForm from "../components/forms/EditUserForm";

export default function ManageStudent() {
  const { data: session, status } = useSession();
  const [students, setStudents] = useState([]);
  const [addUserForm, setAddUserForm] = useState(false);
  const [editUserForm, setEditUserForm] = useState(false);
  const [currEditUserID, setCurrEditUserID] = useState(0);

  const fetchStudents = async () => {
    try {
      const response = await fetchStudentsList(session.accessToken);

      setStudents(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchStudents();
    }
  }, [session]);

  if (status === "loading") return <div>Loading</div>;

  if (!session) return <div>No session token found</div>;
  if (session.user.role !== "Faculty" && session.user.role !== "Hod")
    return <div>Unauthrorized User</div>;

  const handleDelete = async (studentId: number) => {
    const result = await deleteStudent(session.accessToken, studentId);
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
    const result = await createStudent(session.accessToken, values);
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
      currEditUserID
    );
    if (result.success) {
      toast.success(result.message);
      fetchStudents();
      setAddUserForm(false);
    } else {
      toast.error(result.error || "Error in edit user");
    }

    setSubmitting(false);
  };

  return (
    <>
      <div>Manage Student Page</div>
      <div className="flex flex-col items-center justify-around gap-3">
        {students.length > 0 &&
          students.map((student: UserType) => (
            <div className="flex" key={student.id}>
              <p>{student.name}</p>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(student.id)}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setCurrEditUserID(student.id);
                  setEditUserForm(true);
                }}
              >
                Edit
              </Button>
            </div>
          ))}

        {students.length === 0 && <div>No student found</div>}
      </div>

      <Button onClick={() => setAddUserForm(true)}>Add student</Button>

      <Modal
        open={addUserForm}
        onClose={() => setAddUserForm(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddUserForm
          department={session.user.department}
          handleAddUser={handleAddStudent}
          userTobeAddedRole="Student"
        />
      </Modal>

      <Modal
        open={editUserForm}
        onClose={() => setEditUserForm(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditUserForm
          department={session.user.department}
          handleEditUser={handleEditStudent}
          userToBeEditedRole="Student"
          userId={currEditUserID}
        />
      </Modal>
    </>
  );
}
