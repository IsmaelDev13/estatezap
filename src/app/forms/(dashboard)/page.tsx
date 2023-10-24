import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CardStatsWrapper from "../_components/wrappers/CardStatsWapper";
import { Separator } from "@/components/ui/separator";
import FormCardsWrapper from "../_components/wrappers/FormCardsWrapper";
import CreateFormBtn from "../modals/CreateFormModal";

export default function Page() {
  return (
    <MaxWidthWrapper>
      <CardStatsWrapper />
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CreateFormBtn />
        <FormCardsWrapper />
      </div>
    </MaxWidthWrapper>
  );
}
