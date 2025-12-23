import { Grid, Stack } from "@mui/material";
import SearchBar from "../search-bar";
import CategoriesFilters from "../categories-filters";
import { BE_Category } from "@/types/api/base/categories";
import { NewsFilters as FilterTypes } from "@/services/api/news";

type PropsT = {
  filters: FilterTypes;
  categories: BE_Category[];
  onCategoryChange: (categoryId: string | undefined) => void;
  onSearchChange: (search: string) => void;
};

export default function NewsFilters({
  filters,
  categories,
  onCategoryChange,
  onSearchChange,
}: PropsT) {
  return (
    <Grid size={{ xs: 12, lg: 4 }}>
      <Stack spacing={3}>
        <SearchBar onSearchChange={onSearchChange} />
        <CategoriesFilters
          filters={filters}
          categories={categories}
          onCategoryChange={onCategoryChange}
        />
      </Stack>
    </Grid>
  );
}
