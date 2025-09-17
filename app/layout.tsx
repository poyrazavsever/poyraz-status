import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
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
        <Toaster
          position="bottom-right"
          toastOptions={{
            // Default toast style
            style: {
              background: "rgb(220 220 220)", // neutral-100
              color: "rgb(38 38 38)", // neutral-800
              borderRadius: "0.75rem",
              fontFamily: "Nunito, sans-serif",
              fontSize: "0.97rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              border: "1px solid #e5e7eb", // neutral-200
              padding: "0.75rem 1.25rem",
            },
            className:
              "dark:bg-neutral-800 dark:text-neutral-100 bg-neutral-100 text-neutral-800",
            duration: 3500,
            // Success toast style
            success: {
              style: {
                background: "rgb(34 197 94)", // green-500
                color: "#fff",
                border: "1px solid rgb(22 163 74)", // green-600
              },
              iconTheme: {
                primary: "rgb(34 197 94)", // green-500
                secondary: "#fff",
              },
              className:
                "dark:bg-green-600 dark:text-white bg-green-500 text-white",
            },
            // Error toast style
            error: {
              style: {
                background: "rgb(239 68 68)", // red-500
                color: "#fff",
                border: "1px solid rgb(220 38 38)", // red-600
              },
              iconTheme: {
                primary: "rgb(239 68 68)", // red-500
                secondary: "#fff",
              },
              className:
                "dark:bg-red-600 dark:text-white bg-red-500 text-white",
            },
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
