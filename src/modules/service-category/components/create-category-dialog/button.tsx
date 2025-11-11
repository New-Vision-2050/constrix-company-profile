"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { Add } from "iconsax-reactjs";
import { useTranslations } from "next-intl";
import CreateServiceCategoryDialog from "./index";

type Props = {
  onSuccess?: VoidFunction;
};

function CreateServiceCategoryButton({ onSuccess }: Props) {
  const t = useTranslations("serviceCategories");
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
      <CreateServiceCategoryDialog
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
}

export default CreateServiceCategoryButton;
