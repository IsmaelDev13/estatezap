"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { cn } from "@/lib/utils";
import { KindeUser, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";

interface NavbarProps {
  user: any;
}

const Navbar = ({ user }: NavbarProps) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Link href={"/"} className="flex z-40 font-semibold">
        <span>estatezap.</span>
      </Link>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <ModeToggle />
        {isLoading && <p>Loading...</p>}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant={"ghost"} size={"sm"}>
                Login
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>Get Notes free</Button>
            </SignInButton>
          </>
        )}

        {isAuthenticated && !isLoading && (
          <>
            <Button variant={"ghost"} size={"sm"} asChild>
              <Link href={"/notes/documents"}>Enter Notes</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        {/* {user.id && (
          <Button variant={"ghost"} size={"sm"} asChild>
            <Link href={"/notes/documents"}>Enter Notes</Link>
          </Button>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
