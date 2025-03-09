import type { Metadata } from "next";
import "./globals.css";
import { AuthContextProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import QueryProvider from "@/lib/query-provider";

export const metadata: Metadata = {
  title: "Task Management System",
  description: "This is task management system build for my assissment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthContextProvider>

        <Toaster />
      </body>
    </html>
  );
}
