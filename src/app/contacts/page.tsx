import Contacts from "@/components/Contacts";
import { db } from "@/db";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { AddContactModal } from "./_components/modals/AddContactModal";

const Page = async () => {
  const user = await currentUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  return (
    <>
      <Contacts />
      <AddContactModal />
    </>
  );
};

export default Page;
