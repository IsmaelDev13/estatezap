import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 bg-background  dark:bg-[#1f1f1f] z-50">
      <Link href={"/"} className="flex z-40 font-semibold">
        <span>estatezap.</span>
      </Link>
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant={"ghost"} size={"sm"}>
          Privacy policy
        </Button>
        <Button variant={"ghost"} size={"sm"}>
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
