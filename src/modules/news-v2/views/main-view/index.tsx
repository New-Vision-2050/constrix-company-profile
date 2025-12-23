"use client";

import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import PageSection from "@/layouts/main/page-section";
import { Grid, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { NewsFilters } from "@/services/api/news";
import { useMemo, useState } from "react";
import CenteredPagination from "@/components/ui/others/centered-pagination";
import NewsGrid from "../../components/news-grid";
import NewsFilters from "../../components/news-filters";
import useNewsData from "../../hooks/useNewsData";
import { BE_Category } from "@/types/api/base/categories";

type PropsT = {
  categories: BE_Category[];
};

function NewsV2MainView({ categories }: PropsT) {
  const t = useTranslations("newsV2");
  const [filters, setFilters] = useState<NewsFilters>({});
  const { data, isLoading, isError, refetch } = useNewsData(filters);
  const news = useMemo(() => data?.data.payload, [data]);
  const pagination = useMemo(() => data?.data.pagination, [data]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setFilters({ ...filters, page: value });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (categoryId: string | undefined) => {
    const newFilters = { ...filters, page: 1 };
    if (categoryId) {
      newFilters.category_website_cms_id = categoryId;
    } else {
      delete newFilters.category_website_cms_id;
    }
    setFilters(newFilters);
  };

  const handleSearchChange = (search: string) => {
    setFilters({ ...filters, search: search.trim() || undefined, page: 1 });
  };

  return (
    <MainPageContent title={t("title")}>
      <LayoutStack spacing={8}>
        <PageSection>
          <Grid container spacing={4}>
            {/* Main Content */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Stack spacing={4}>
                <NewsGrid
                  news={news}
                  isLoading={isLoading}
                  isError={isError}
                  onRetry={() => refetch()}
                />
                {pagination && pagination?.last_page > 1 && (
                  <CenteredPagination
                    count={pagination?.last_page ?? 1}
                    page={pagination?.page ?? 1}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                  />
                )}
              </Stack>
            </Grid>

            {/* Sidebar */}
            <NewsFilters
              filters={filters}
              categories={categories}
              onCategoryChange={handleCategoryChange}
              onSearchChange={handleSearchChange}
            />
          </Grid>
        </PageSection>
      </LayoutStack>
    </MainPageContent>
  );
}

export default NewsV2MainView;
