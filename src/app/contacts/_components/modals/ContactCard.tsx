import { Checkbox } from "@/components/ui/checkbox";
import { Contact } from "@prisma/client";
import { BsThreeDotsVertical } from "react-icons/bs";

import { format } from "date-fns";

interface ContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactCardProps) => {
  const dateMonth = format(new Date(contact.createdAt), "MMM dd yyyy");

  const formattedDate = format(new Date(contact.createdAt), "hh:mm a");
  return (
    <div className="flex items-center justify-around py-3 border px-4">
      <BsThreeDotsVertical />
      <Checkbox />
      <div className="flex items-center gap-2">
        <p className="uppercase h-10 w-10 rounded-full bg-blue-400 text-white flex items-center justify-center">
          {contact.firstName.slice(0, 1)}
          {contact.lastName.slice(0, 1)}
        </p>
        <p className="text-sm">
          {contact.firstName} {contact.lastName}
        </p>
      </div>
      <p className="text-sm">{contact.phoneNumber}</p>
      <p className="text-sm">{contact.email}</p>
      <div>
        <p className="text-sm">{dateMonth}</p>
        <p className="text-sm">{formattedDate}</p>
      </div>
    </div>
  );
};

export default ContactCard;
