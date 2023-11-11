import { cn, constructMetadata } from "@/lib/utils";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";
import { ConvexClientProvider } from "@/components/providers/ConvexProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <Providers>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <body
              className={cn(
                "min-h-screen  antialiased grainy",
                inter.className
              )}
            >
              <Toaster />
              <Navbar />
              {children}
            </body>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </Providers>
    </html>
  );
}
