import React from "react";
import { FormElementInstance } from "../../_components/builder/FormElements";
import FormSubmitComponent from "../../_components/submit/FormSubmitComponent";
import { GetFormContentByUrl } from "../../../../../actions/form";

async function SubmitPage({ params }: { params: { formUrl: string } }) {
  const form = await GetFormContentByUrl(params.formUrl);

  if (!form) {
    throw new Error("form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];
  console.log("form", formContent);

  return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
}

export default SubmitPage;
