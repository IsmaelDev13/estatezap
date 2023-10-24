"use client";
import { trpc } from "@/app/_trpc/client";
import FormCard from "../cards/FormCard";

const FormCardsWrapper = () => {
  const { data: forms, isLoading } = trpc.getForms.useQuery();

  return (
    <>
      {forms?.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
};

export default FormCardsWrapper;
