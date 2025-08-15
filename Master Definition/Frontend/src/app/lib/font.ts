import localFont from "next/font/local";

export const helvetica = localFont({
  src: [
    {
      path: "../../../public/fonts/helvetica-255/Helvetica.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/helvetica-255/Helvetica-Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-helvetica", // Optional: for use with Tailwind CSS
});
