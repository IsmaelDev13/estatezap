import DesignerContextProvider from "@/components/context/DesignerContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });
export default function FormsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DesignerContextProvider>
          <div className="flex flex-col min-h-screen min-w-full max-h-screen">
            <main className="flex w-full flex-grow">{children}</main>
          </div>
          <Toaster />
        </DesignerContextProvider>
      </body>
    </html>
  );
}
