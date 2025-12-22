import { Grid, Stack } from "@mui/material";
import { mockCategories } from "../constants/dummy";
import SearchBar from "@/modules/news-v2/components/search-bar";
import CategoriesFilters from "./CategoriesFilters";
import { BE_Category } from "@/types/api/base/categories";
import { ProjectsFilters as FilterTypes } from "@/services/api/projects";

type PropsT = {
    filters: FilterTypes
    categories: BE_Category[]
    onCategoryChange: (categoryId: string | undefined) => void
    onSearchChange: (search: string) => void
}

export default function ProjectsFilters({ filters, categories, onCategoryChange, onSearchChange }: PropsT) {
    return (
        <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={3}>
                <SearchBar onSearchChange={onSearchChange} />
                <CategoriesFilters filters={filters} categories={categories} onCategoryChange={onCategoryChange} />
            </Stack>
        </Grid>
    );
}