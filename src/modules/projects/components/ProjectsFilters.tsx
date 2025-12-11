import AdBanner from "@/modules/news-v2/components/ad-banner";
import { Grid, Stack } from "@mui/material";
import { mockCategories, mockRecentPosts, mockTags } from "../constants/dummy";
import PopularTags from "@/modules/news-v2/components/popular-tags";
import RecentPosts from "@/modules/news-v2/components/recent-posts";
import Categories from "@/modules/news-v2/components/categories";
import SearchBar from "@/modules/news-v2/components/search-bar";

export default function ProjectsFilters() {
    return (
        <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={3}>
                <SearchBar onSearchChange={() => { }} />
                <Categories
                    categories={mockCategories}
                    onCategoryChange={() => { }}
                />
                <RecentPosts posts={mockRecentPosts} />
                <PopularTags tags={mockTags} />
                <AdBanner />
            </Stack>
        </Grid>
    );
}