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

  if (status === "loading") return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg text-gray-600">Loading...</div>
    </div>
  );

  if (!session) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg text-red-600">No session token found</div>
    </div>
  );

  if (session.user.role !== "Faculty" && session.user.role !== "Hod")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Unauthorized User</div>
      </div>
    );

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Manage Students</h1>
            <Button 
              onClick={() => setAddUserForm(true)}
              variant="contained"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Add Student
            </Button>
          </div>

          {students.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No students found</div>
              <div className="text-gray-400">Start by adding your first student</div>
            </div>
          ) : (
            <div className="space-y-3">
              {students.map((student: UserType) => (
                <div 
                  key={student.id} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-medium text-sm">
                        {student.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{student.name}</p>
                      <p className="text-sm text-gray-500">Student</p>
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
                      className="text-blue-600 border-blue-300 hover:bg-blue-50 px-4 py-1"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(student.id)}
                      className="text-red-600 border-red-300 hover:bg-red-50 px-4 py-1"
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
    </div>
  );
}