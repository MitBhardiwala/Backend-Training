import "./globals.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer";

import { NextAuthProvider } from "./lib/NextAuthProvider";
import { helvetica } from "./lib/font";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
      <html>
        <body className={helvetica.className}>
          {" "}
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </NextAuthProvider>
  );
}
