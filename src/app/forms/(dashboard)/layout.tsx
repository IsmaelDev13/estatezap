import React from "react";
import { UserButton } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <Navbar />
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
}

export default Layout;
