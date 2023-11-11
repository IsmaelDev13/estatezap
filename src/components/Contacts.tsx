"use client";
import { trpc } from "@/app/_trpc/client";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { DollarSign, Network, Plus, Trash2 } from "lucide-react";
import { useAddContact } from "@/hooks/use-contact";
import { Checkbox } from "./ui/checkbox";
import { BsThreeDotsVertical } from "react-icons/bs";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import { useEffect, useState } from "react";
import { Contact } from "@prisma/client";
import { cn } from "@/lib/utils";

const Contacts = () => {
  const router = useRouter();
  const { data: contacts, isLoading } = trpc.getUserContacts.useQuery();
  const modal = useAddContact();
  const utils = trpc.useContext();
  const [checkedContacts, setCheckedContacts] = useState<any>([]);
  const { mutate: deleteContact } = trpc.deleteContact.useMutation({
    onSuccess: () => {
      utils.getUserContacts.invalidate();
    },
  });

  useEffect(() => {
    console.log(checkedContacts);
  }, [checkedContacts]);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <ImSpinner2 className="h-6 w-6 animate-spin" />
        Gathering contacts...
      </div>
    );

  const handleChange = (checked: boolean, id: string) => {
    const updatedCheckedItems = checked
      ? [...checkedContacts, { contactId: id, checked }]
      : checkedContacts.filter(
          (item: { contactId: string }) => item.contactId !== id
        );

    setCheckedContacts(updatedCheckedItems);
  };

  return (
    <MaxWidthWrapper>
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <div
            onClick={() => modal.onOpen()}
            className="h-8 w-8 rounded bg-white items-center justify-center flex shadow"
          >
            <Plus className="h-6 w-6 " />
          </div>
          <div
            onClick={
              () =>
                deleteContact({
                  contactIds: checkedContacts.map((item) => item.contactId),
                })
              // deleteContact(checkedContacts.map((item) => item.contactId))
            }
            className="h-8 w-8 rounded bg-white items-center justify-center flex shadow"
          >
            <Trash2
              className={cn(
                "h-6 w-6 text-gray-500",
                checkedContacts?.length > 0 && "text-red-500"
              )}
            />
          </div>
          <div
            className="flex items-center gap-2 rounded bg-white h-8 shadow px-2"
            onClick={() => router.push(`/contacts/management`)}
          >
            <DollarSign className="h-6 w-6 text-gray-500" />
            <p className="text-sm font-medium">Opportunities</p>
          </div>
        </div>
        <table className="w-full bg-white mt-4">
          <thead>
            <tr>
              <th>
                <Checkbox />
              </th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Created</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="bg-white mt-4">
            {contacts?.map((contact) => {
              const dateMonth = format(
                new Date(contact.createdAt),
                "MMM dd yyyy"
              );

              const formattedDate = format(
                new Date(contact.createdAt),
                "hh:mm a"
              );
              return (
                <tr key={contact.id} className="border-t">
                  <td>
                    <div className="flex items-center gap-2 py-4">
                      <BsThreeDotsVertical />
                      <Checkbox
                        value={contact.id}
                        onCheckedChange={(e) => handleChange(e, contact.id)}
                        // onChange={(e) => console.log(e)}
                        // onChange={handleChange}
                        // checked={checkedContacts.includes(contact.id)}
                      />
                    </div>
                  </td>
                  <td className="flex items-center gap-2">
                    <p className="uppercase h-10 w-10 rounded-full bg-blue-400 text-white flex items-center justify-center">
                      {contact.firstName.slice(0, 1)}
                      {contact.lastName.slice(0, 1)}
                    </p>
                    <p
                      onClick={() => router.push(`/contacts/${contact.id}`)}
                      className="text-sm hover:underline cursor-pointer"
                    >
                      {contact.firstName} {contact.lastName}
                    </p>
                  </td>
                  <td className="text-sm">{contact.phoneNumber}</td>
                  <td className="text-sm">{contact.email}</td>
                  <td>
                    <p className="text-sm">{dateMonth}</p>
                    <p className="text-sm">{formattedDate}</p>
                  </td>
                  <td>{contact.contactType}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </MaxWidthWrapper>
  );
};

export default Contacts;
