"use client";

import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import PageSection from "@/layouts/main/page-section";
import { Grid, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import NewsCard from "../../components/news-card";
import SearchBar from "../../components/search-bar";
import Categories from "../../components/categories";
import RecentPosts from "../../components/recent-posts";
import PopularTags from "../../components/popular-tags";
import AdBanner from "../../components/ad-banner";
import { useQuery } from "@tanstack/react-query";
import { NewsApi, NewsFilters } from "@/services/api/news";
import { GridCardsSkeleton } from "@/components/ui/interactions";
import { useState } from "react";
import CenteredPagination from "@/components/ui/others/centered-pagination";

const mockCategories = [
  { id: "1", name: "Marketing", count: 5 },
  { id: "2", name: "Community", count: 3 },
  { id: "3", name: "Tutorials", count: 8 },
  { id: "4", name: "Business", count: 12 },
  { id: "5", name: "Management", count: 4 },
];

const mockRecentPosts = [
  {
    id: "1",
    title:
      "The Evolution of E-Commerce: Trends Shaping the Online Retail Landscape",
    date: "12 Aug 2024",
    readTime: "8 min read",
    image: "/assets/images/cover/cover-7.webp",
  },
  {
    id: "2",
    title:
      "Cybersecurity in the 21st Century: Protecting Data in a Digital World",
    date: "12 Aug 2024",
    readTime: "8 min read",
    image: "/assets/images/cover/cover-8.webp",
  },
  {
    id: "3",
    title: "The Role of Big Data in Transforming Business Strategies",
    date: "12 Aug 2024",
    readTime: "8 min read",
    image: "/assets/images/cover/cover-9.webp",
  },
  {
    id: "4",
    title: "Genetic Engineering: Ethical Considerations and Future Prospects",
    date: "12 Aug 2024",
    readTime: "8 min read",
    image: "/assets/images/cover/cover-10.webp",
  },
];

const mockTags = [
  "Technology",
  "Health and Wellness",
  "Travel",
  "Finance",
  "Education",
  "Food and Beverage",
  "Fashion",
  "Home and Garden",
];

function NewsV2MainView() {
  const t = useTranslations("newsV2");
  const [filters, setFilters] = useState<NewsFilters>({
    page: 1,
    per_page: 15,
  });

  const newsQuery = useQuery({
      queryKey: ["newsList", filters],
      queryFn: async () => {
        return await NewsApi.list(filters);
      },
    }),
    { data, isLoading } = newsQuery;

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({
      ...prev,
      search: search.trim() || undefined,
      page: 1,
    }));
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setFilters((prev) => ({
      ...prev,
      category_website_cms_id: categoryId || undefined,
      page: 1,
    }));
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MainPageContent title={t("title")}>
      <LayoutStack spacing={8}>
        <PageSection>
          <Grid container spacing={4}>
            {/* Main Content */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Stack spacing={4}>
                {isLoading ? (
                  <GridCardsSkeleton items={8} size={{ xs: 12, sm: 6 }} />
                ) : (
                  <>
                    <Grid container spacing={3}>
                      {data?.data.payload.map((newsItem) => (
                        <Grid key={newsItem.id} size={{ xs: 12, sm: 6 }}>
                          <NewsCard newsItem={newsItem} />
                        </Grid>
                      ))}
                    </Grid>
                    {data?.data.pagination &&
                      data.data.pagination.last_page > 1 && (
                        <CenteredPagination
                          count={data.data.pagination.last_page}
                          page={filters.page || 1}
                          onChange={handlePageChange}
                          color="primary"
                          size="large"
                        />
                      )}
                  </>
                )}
              </Stack>
            </Grid>

            {/* Sidebar */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={3}>
                <SearchBar onSearchChange={handleSearchChange} />
                <Categories
                  categories={mockCategories}
                  onCategoryChange={handleCategoryChange}
                />
                <RecentPosts posts={mockRecentPosts} />
                <PopularTags tags={mockTags} />
                <AdBanner />
              </Stack>
            </Grid>
          </Grid>
        </PageSection>
      </LayoutStack>
    </MainPageContent>
  );
}

export default NewsV2MainView;
