// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { currentUser } from "@clerk/nextjs";
import Navbar from "./_components/Navbar";
// import { getUserSubscriptionPlan } from "@/lib/stripe";
import { redirect } from "next/navigation";

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  // const { getUser } = getKindeServerSession();
  // const user = getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");
  return (
    <div className="h-full dark:bg-[#1f1f1f]">
      <Navbar user={user} />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default MarketingLayout;
