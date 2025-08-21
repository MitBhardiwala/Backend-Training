import "./globals.css";
import { NextAuthProvider } from "./lib/NextAuthProvider";
import { helvetica } from "./lib/font";
import Layout from "./components/layout/Layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
      <html>
        <body className={helvetica.className}>
          <Layout>{children}</Layout>
        </body>
      </html>
    </NextAuthProvider>
  );
}
