import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          const bodyData = {
            email: credentials.email,
            password: credentials.password,
          };
          const res = await fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },

            body: JSON.stringify(bodyData),
          });

          const data = await res.json();

          if (data.success && data.token) {
            return {
              id: data.data.id,
              name: data.data.name,
              email: data.data.email,
              department: data.data.department,
              role: data.data.role,
              accessToken: data.token,
            };
          }

          throw new Error(data.error);
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Using JWT for session management,
    maxAge: 14400, // 4 hours
  },
  pages: {
    signIn: "/login", // Customize your sign-in page if necessary
  },
  callbacks: {
    async redirect({ url }) {
      return url;
    },
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.department = user.department;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.department = token.department;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET || "your_secret_key",
};

export default NextAuth(authOptions);
