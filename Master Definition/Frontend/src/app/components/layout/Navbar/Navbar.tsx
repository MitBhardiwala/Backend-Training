"use client";

import { getUserDetails } from "@/app/lib/services/user/user";
import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "./ProfilePhoto";
import { UserType } from "@/app/lib/definitions";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [userDetails, setUserDetails] = useState<UserType | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (session && session?.accessToken) {
        try {
          const response = await getUserDetails(session.accessToken);
          setUserDetails(response);
        } catch (error) {
          console.log("Error in fetching user data :", error);
        }
      }
    };
    fetchUser();
  }, [session, status]);

  return (
    <div className="flex bg-blue-100 justify-between items-center p-5 h-[10vh]">
      <button onClick={() => router.push("/dashboard")}>
        <p className="text-2xl text-blue-700 cursor-pointer">
          Leave Management
        </p>
      </button>

      <div className="flex items-center gap-4">
        {status === "authenticated" && userDetails && (
          <Profile user={userDetails} />
        )}

        <Button
          variant="outlined"
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
  );
};

export default Navbar;
