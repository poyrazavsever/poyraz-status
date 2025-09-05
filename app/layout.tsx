import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Poyraz Avsever's Status Page - Oh My Status!",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
