import { InputAdornment, TextField } from "@mui/material";
import { SearchNormal1 } from "iconsax-reactjs";
import { useTranslations } from "next-intl";

export default function ServicesSearchField() {
  const t = useTranslations("pages.services");
  return (
    <TextField
      id="services-search-field"
      label={t("searchPlaceholder")}
      variant="outlined"
      fullWidth
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <SearchNormal1 size="25" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
