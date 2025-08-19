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
} from "../lib/services/hod/hod";
import { toast } from "react-toastify";
import AddUserForm from "../components/forms/AddUser";
import EditUserForm from "../components/forms/EditUserForm";

export default function ManageFaculty() {
  const { data: session, status } = useSession();
  const [faculties, setFaculties] = useState([]);
  const [addFacultyForm, setAddFacultyForm] = useState(false);
  const [editFacultyForm, setEditFacultyForm] = useState(false);
  const [currEditFacultyId, setCurrEditFacultyId] = useState(0);
  const fetchFaculties = async () => {
    try {
      const response = await fetchFacultysList(session.accessToken);
      setFaculties(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchFaculties();
    }
  }, [session]);

  if (status === "loading") return <div>Loading</div>;

  if (!session) return <div>No session token found</div>;
  if (session.user.role !== "Hod") return <div>Unauthrorized User</div>;

  const handleDelete = async (facultyId: number) => {
    const result = await deleteFaculty(session.accessToken, facultyId);
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
    const result = await createFaculty(session.accessToken, values);

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
      currEditFacultyId
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
      <div>Manage Faculty</div>;
      <div className="flex flex-col items-center justify-around gap-3">
        {faculties.length > 0 &&
          faculties.map((faculty: UserType) => (
            <div className="flex" key={faculty.id}>
              <p>{faculty.name}</p>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(faculty.id)}
              >
                Delete
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => {
                setCurrEditFacultyId(faculty.id)
                setEditFacultyForm(true)}}>
                Edit
              </Button>
            </div>
          ))}

        {faculties.length === 0 && <div>No Faculty found</div>}
      </div>
      <Button onClick={() => setAddFacultyForm(true)}>Add faculty</Button>
      <Modal
        open={addFacultyForm}
        onClose={() => setAddFacultyForm(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddUserForm
          department={session.user.department}
          handleAddUser={handleAddFaculty}
          userTobeAddedRole="Faculty"
        />
      </Modal>
      <Modal
        open={editFacultyForm}
        onClose={() => setEditFacultyForm(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditUserForm
          department={session.user.department}
          handleEditUser={handleEditFaculty}
          userToBeEditedRole="Faculty"
          userId={currEditFacultyId}
        />
      </Modal>
    </>
  );
}
