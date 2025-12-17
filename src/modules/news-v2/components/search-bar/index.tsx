"use client";

import { InputAdornment, TextField } from "@mui/material";
import { SearchNormal1 } from "iconsax-reactjs";
import { useDebounce } from "minimal-shared/hooks";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearchChange?: (search: string) => void;
}

function SearchBar({ onSearchChange }: SearchBarProps) {
  const t = useTranslations("newsV2");
  const [searchValue, setSearchValue] = useState("");
  const deboucedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    onSearchChange?.(deboucedSearch);
  }, [deboucedSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <TextField
      fullWidth
      value={searchValue}
      onChange={handleSearchChange}
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
