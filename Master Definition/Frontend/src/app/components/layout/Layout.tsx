import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}
