import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <div className="bg-gray-100 ">
        <div className="max-w-7xl mx-auto min-h-[90vh] p-5">{children}</div>
      </div>
      <ToastContainer />
    </>
  );
}
