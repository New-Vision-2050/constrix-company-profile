"use client";
import { Grid, Stack } from "@mui/material";
import ProjectsGrid from "./ProjectsGrid";
import CenteredPagination from "@/components/ui/others/centered-pagination";
import ProjectsFilters from "./ProjectsFilters";
import useProjectsData from "../hooks/useProjectsData";
import { useMemo, useState } from "react";
import { ProjectsFilters as FilterTypes } from "@/services/api/projects";
import { BE_Category } from "@/types/api/base/categories";


export default function ViewEntryPoint({ categories }: { categories: BE_Category[] }) {
    // projects filters
    const [filters, setFilters] = useState<FilterTypes>({})
    // get projects data
    const { data, isLoading, isError, refetch } = useProjectsData(filters);
    const projects = useMemo(() => data?.data.payload, [data]);
    const pagenation = useMemo(() => data?.data.pagination, [data]);

    // handle page change
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setFilters({ ...filters, page: value });
    }
    // handle category change
    const handleCategoryChange = (categoryId: string) => {
        setFilters({ ...filters, website_project_setting_id: categoryId });
    }
    // handle search change
    const handleSearchChange = (search: string) => {
        setFilters({ ...filters, name: search.trim() || undefined });
    }

    return (
        <Grid container spacing={4}>
            {/* Main Content */}
            <Grid size={{ xs: 12, lg: 8 }}>
                <Stack spacing={4}>
                    {/* projects grid */}
                    <ProjectsGrid projects={projects} isLoading={isLoading} isError={isError} onRetry={() => refetch()} />
                    {/* pagination */}
                    {pagenation && pagenation?.last_page > 1 &&
                        <CenteredPagination
                            count={pagenation?.last_page ?? 1}
                            page={pagenation?.page ?? 1}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                        />
                    }
                </Stack>
            </Grid>

            {/* Sidebar */}
            <ProjectsFilters categories={categories} onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} />
        </Grid>
    );
}