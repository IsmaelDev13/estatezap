"use client";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl  font-bold ">
        Your Ideas, Documents & Plans. Unified. Welcome to{" "}
        <span className="underline">EstateZap</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        EstateZap is the connected workspace where <br /> better, faster work
        happens.
      </h3>
      {isLoading && (
        <div className="flex w-full items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      {!isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href={"/documents"}>
            Enter EstateZap
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}

      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>Get Notes free</Button>
          <ArrowRight className="h-4 w-4" />
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
