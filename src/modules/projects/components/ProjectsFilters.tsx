import { Grid, Stack } from "@mui/material";
import { mockCategories } from "../constants/dummy";
import SearchBar from "@/modules/news-v2/components/search-bar";
import CategoriesFilters from "./CategoriesFilters";


type PropsT = {
    onCategoryChange: (categoryId: string) => void
    onSearchChange: (search: string) => void
}
export default function ProjectsFilters({ onCategoryChange, onSearchChange }: PropsT) {
    return (
        <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={3}>
                <SearchBar onSearchChange={onSearchChange} />
                <CategoriesFilters categories={mockCategories} onCategoryChange={onCategoryChange} />
            </Stack>
        </Grid>
    );
}