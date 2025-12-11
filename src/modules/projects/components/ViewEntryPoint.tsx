"use client";
import { Grid, Stack } from "@mui/material";
import ProjectsGrid from "./ProjectsGrid";
import CenteredPagination from "@/components/ui/others/centered-pagination";
import ProjectsFilters from "./ProjectsFilters";
import useProjectsData from "../hooks/useProjectsData";
import { useMemo, useState } from "react";
import { ProjectsFilters as FilterTypes } from "@/services/api/projects";


export default function ViewEntryPoint() {
    // projects filters
    const [filters, setFilters] = useState<FilterTypes>({})
    // get projects data
    const { data, isLoading, isError } = useProjectsData(filters);
    const projects = useMemo(() => data?.data.payload, [data]);
    const pagenation = useMemo(() => data?.data.pagination, [data]);

    // handle page change
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setFilters({ ...filters, page: value });
    }

    return (
        <Grid container spacing={4}>
            {/* Main Content */}
            <Grid size={{ xs: 12, lg: 8 }}>
                <Stack spacing={4}>
                    {/* projects grid */}
                    <ProjectsGrid projects={projects} isLoading={isLoading} isError={isError} />
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
            <ProjectsFilters />
        </Grid>
    );
}