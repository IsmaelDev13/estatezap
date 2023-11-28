// "use client";
import { trpc } from "@/app/_trpc/client";
import { GetContactById } from "../../../actions/form";
import SingleContact from "../_components/SingleContact";
// import { GetContactById } from "../../../../actions/form";
// import SingleContact from "../_components/SingleContact";

async function ContactPage({ params }: { params: { contactId: string } }) {
  //   const { data: contact, isLoading } = trpc.getContactById.useQuery(
  //     Number(params.id)
  //   );

  //   if (!contact) {
  //     throw new Error("Contact not found");
  //   }
  console.log(params);

  return <SingleContact id={params.contactId} />;
}

export default ContactPage;
