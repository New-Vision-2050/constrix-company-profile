import { InputAdornment, TextField } from "@mui/material";
import { SearchNormal1 } from "iconsax-reactjs";

export default function ServicesSearchField() {
  return (
    <TextField
      id="outlined-suffix-shrink"
      label="بحث"
      variant="outlined"
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
