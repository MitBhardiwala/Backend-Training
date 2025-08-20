"use client";

import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session,router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Leave Management
        </h1>
        <p className="text-gray-600 mb-8">Manage your leave requests</p>

        <Button variant="contained" onClick={() => router.push("/login")}>
          Login
        </Button>
      </div>
    </div>
  );
}
