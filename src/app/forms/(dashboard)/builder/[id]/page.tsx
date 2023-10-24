import { trpc } from "@/app/_trpc/client";
import FormBuilder from "@/components/FormBuilder";
import React from "react";

function BuilderPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = trpc.getFormsById.useQuery({ id });

  if (!form) {
    throw new Error("form not found");
  }
  return <FormBuilder form={form} />;
}

export default BuilderPage;
