import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/app/components/theme-provider";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import projectsData from "@/data/projects.json";
import type { AnyProject } from "@/types/project";

export const metadata: Metadata = {
  title: "Poyraz Avsever's Status Page - Oh My Status!",
  description:
    "This is an open-source status monitoring platform built to provide real-time information about the uptime and health of my coded web projects. The goal is to offer transparent visibility into service availability, incident history, and performance updates. ",
};

const projects = projectsData as AnyProject[];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden bg-(--color-background) text-(--color-text)">
        <ThemeProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--color-surface)",
                color: "var(--color-text)",
                borderRadius: "0.75rem",
                fontSize: "0.97rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                border: "1px solid var(--color-border)",
                padding: "0.75rem 1.25rem",
              },
              duration: 3500,
              success: {
                style: {
                  background: "var(--color-accent)",
                  color: "#fff",
                  border: "1px solid var(--color-accent)",
                },
                iconTheme: {
                  primary: "var(--color-accent)",
                  secondary: "#fff",
                },
              },
              error: {
                style: {
                  background: "rgb(239 68 68)",
                  color: "#fff",
                  border: "1px solid rgb(220 38 38)",
                },
                iconTheme: {
                  primary: "rgb(239 68 68)",
                  secondary: "#fff",
                },
              },
            }}
          />
          <LayoutWrapper projects={projects}>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
