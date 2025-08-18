import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <section>{children}</section>
      <ToastContainer />
      <Footer />
    </>
  );
}
