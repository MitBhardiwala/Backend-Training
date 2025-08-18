// src/types/next-auth.d.ts (or similar path)
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string; // Example: Add a custom 'id' property
      
      // Add any other custom properties here
    } & DefaultSession["user"];
  }

  interface User {
    // Add custom properties to the User type if needed
    // For example, if you have a 'role' property for your user
    role?: string;
  }
}
