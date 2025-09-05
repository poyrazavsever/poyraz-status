import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";



export const metadata: Metadata = {
  title: "Poyraz Avsever's Status Page - Oh My Status!",
  description:
    "This is an open-source status monitoring platform built to provide real-time information about the uptime and health of my coded web projects. The goal is to offer transparent visibility into service availability, incident history, and performance updates. ",
};
  
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
