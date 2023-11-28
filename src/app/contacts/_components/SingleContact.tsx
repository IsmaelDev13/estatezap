"use client";
import { trpc } from "@/app/_trpc/client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ContactSchema, ContactSchemaType } from "@/schemas/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { UpdateContact } from "../../../actions/form";

interface SingleContactProps {
  id: string;
}

const SingleContact = ({ id }: SingleContactProps) => {
  const { data: contact, isLoading } = trpc.getContactById.useQuery(Number(id));
  console.log(contact);
  const router = useRouter();

  // if (!contact) {
  //   throw new Error("Contact not found");
  // }

  const form = useForm<ContactSchemaType>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      firstName: contact?.firstName,
      lastName: contact?.lastName,
      email: contact?.email,
      phoneNumber: contact?.phoneNumber,
    },
  });

  async function onSubmit(values: ContactSchemaType) {
    try {
      const formId = await UpdateContact(Number(id), values);

      // console.log(formId);

      toast({
        title: "Success",
        description: "Contact updated successfully",
      });
      router.refresh();
      router.back();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    }
  }

  if (isLoading)
    return (
      <div className="flex flex-col gap-2 items-center justify-center mt-10">
        <ImSpinner2 className="h-6 w-6 animate-spin" />
        <p>Loading contact...</p>
      </div>
    );

  return (
    <MaxWidthWrapper>
      <div
        onClick={() => router.back()}
        className="flex items-center gap-2 my-4 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4  text-blue-400" />
        <p className="text-sm hover:underline">{contact?.firstName}</p>
      </div>
      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input defaultValue={contact?.firstName} {...field} />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input defaultValue={contact?.lastName} {...field} />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Email</FormLabel>
                <FormControl>
                  <Input defaultValue={contact?.email} {...field} />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Phone</FormLabel>
                <FormControl>
                  <Input defaultValue={contact?.phoneNumber} {...field} />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="w-full mt-4 ml-auto rounded"
          >
            {!form.formState.isSubmitting && <span>Save</span>}
            {form.formState.isSubmitting && (
              <ImSpinner2 className="h-5 w-5 animate-spin" />
            )}
          </Button>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};

export default SingleContact;
