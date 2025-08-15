"use client";

import { getUserDetails } from "@/app/lib/services/user/user";
import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "./ProfilePhoto";
import { User } from "@/app/lib/definitions";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (session && session?.accessToken) {
        try {
          const response = await getUserDetails(session.accessToken);

          setUserDetails(response.data);
        } catch (error) {
          console.log("Error in fetching user data :", error);
        }
      }
    };
    fetchUser();
  }, [session, status]);

  return (
    <>
      <div className="flex bg-amber-100 justify-around items-center p-5 ">
        <p className="text-3xl text-blue-700 text">Leave Management</p>
        <div className="flex justify-center items-center gap-4">
          {status === "authenticated" && (
            <Profile
              id={userDetails?.id ?? undefined}
              image={userDetails?.image}
              name={userDetails?.name ?? ""}
              email={userDetails?.email ?? ""}
              department={userDetails?.department ?? ""}
            />
          )}

          <Button
            sx={{ borderColor: "black", color: "black" }}
            variant="outlined"
            size="medium"
            onClick={() => {
              if (status === "authenticated") {
                signOut({ callbackUrl: "/login" });
              } else {
                router.push("/login");
              }
            }}
          >
            {status === "authenticated" ? "Sign Out" : "Sign In"}
          </Button>
        </div>
      </div>
      ;
    </>
  );
};

export default Navbar;
