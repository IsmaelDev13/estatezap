"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { ImShare } from "react-icons/im";

const FormLinkShare = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const shareLink = `${window.location.origin}/forms/submit/${shareUrl}`;

  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} readOnly />
      <Button
        className="w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Copied!",
            description: "Link copied to clipboard",
          });
        }}
      >
        <ImShare className="mr-2 h-4 w-4" />
        Share link
      </Button>
    </div>
  );
};

export default FormLinkShare;
