import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={"/task/organization/:id"}
      afterCreateOrganizationUrl={"/task/organization/:id"}
    />
  );
}
