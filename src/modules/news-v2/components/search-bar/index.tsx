"use client";

import { InputAdornment, TextField } from "@mui/material";
import { SearchNormal1 } from "iconsax-reactjs";
import { useTranslations } from "next-intl";

function SearchBar() {
  const t = useTranslations("newsV2");
  return (
    <TextField
      fullWidth
      placeholder={t("searchPlaceholder")}
      variant="outlined"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchNormal1 size={20} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
      }}
    />
  );
}

export default SearchBar;
