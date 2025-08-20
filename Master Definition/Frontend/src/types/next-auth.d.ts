// src/types/next-auth.d.ts (or similar path)
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Example: Add a custom 'id' property
      role: string;
      name: string;
      department: string | null;
      email: string;

      // Add any other custom properties here
    };
    accessToken: string;
  }

  interface User {
    // Add custom properties to the User type if needed
    // For example, if you have a 'role' property for your user
    role?: string;
  }
}
