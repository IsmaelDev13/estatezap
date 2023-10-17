"use client";

import { useEffect, useState } from "react";

import { SettingsModal } from "@/app/notes/(main)/_components/modals/SettingsModal";
import { CoverImageModal } from "@/app/notes/(main)/_components/modals/CoverImageModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};
