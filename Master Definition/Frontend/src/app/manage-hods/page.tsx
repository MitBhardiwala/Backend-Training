"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchHodsList } from "../lib/services/admin/admin";
import { UserType } from "../lib/definitions";
import { Button } from "@mui/material";

export default function ManageHod() {
  const { data: session, status } = useSession();
  const [hods, setHods] = useState([]);

  const fetchHods = async () => {
    try {
      const response = await fetchHodsList(session.accessToken);
      setHods(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchHods();
    }
  }, [session]);

  if (status === "loading") return <div>Loading</div>;

  if (!session) return <div>No session token found</div>;
  if (session.user.role !== "Admin") return <div>Unauthrorized User</div>;

  return (
    <>
      <div>Manage Hod</div>;
      <div className="flex flex-col items-center justify-around gap-3">
        {hods.length > 0 &&
          hods.map((hod: UserType) => (
            <div className="flex" key={hod.id}>
              <p>{hod.name}</p>
              <Button variant="outlined" color="error">
                Delete
              </Button>
              <Button variant="outlined" color="secondary">
                Edit
              </Button>
            </div>
          ))}

        {hods.length === 0 && <div>No hod found</div>}
      </div>
    </>
  );
}
