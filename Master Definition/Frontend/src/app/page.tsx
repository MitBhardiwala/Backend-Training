import { Button } from "@mui/material";

import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "./lib/services/auth/auth";

const Homepage = async () => {
  const session = await getServerSession(authOptions);
  
  if (session?.accessToken) {
    return redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Leave Management
        </h1>
        <p className="text-gray-600 mb-8">Manage your leave requests</p>

        <Button variant="contained" href="/login">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Homepage;
