"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { Add } from "iconsax-reactjs";
import { useTranslations } from "next-intl";
import CreateServiceDialog from "./index";

type Props = {
  onSuccess?: VoidFunction;
};

function CreateServiceButton({ onSuccess }: Props) {
  const t = useTranslations("services");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Add size={20} />}
        onClick={() => setOpen(true)}
      >
        {t("create")}
      </Button>
      <CreateServiceDialog
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
}

export default CreateServiceButton;
