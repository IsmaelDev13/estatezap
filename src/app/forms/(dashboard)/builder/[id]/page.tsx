import FormBuilder from "@/app/forms/_components/builder/FormBuilder";
import React from "react";
import { GetFormById } from "../../../../../actions/form";

async function BuilderPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const form = await GetFormById(Number(id));

  if (!form) {
    throw new Error("Form not found");
  }

  return <FormBuilder form={form!} />;
}

export default BuilderPage;
