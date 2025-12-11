"use client";
import { Grid, Stack } from "@mui/material";
import ProjectsGrid from "./ProjectsGrid";
import CenteredPagination from "@/components/ui/others/centered-pagination";
import ProjectsFilters from "./ProjectsFilters";


export default function ViewEntryPoint() {
    return (
        <Grid container spacing={4}>
            {/* Main Content */}
            <Grid size={{ xs: 12, lg: 8 }}>
                <Stack spacing={4}>
                    {/* projects grid */}
                    <ProjectsGrid />
                    {/* pagination */}
                    <CenteredPagination
                        count={10}
                        page={1}
                        onChange={() => { }}
                        color="primary"
                        size="large"
                    />
                </Stack>
            </Grid>

            {/* Sidebar */}
            <ProjectsFilters />
        </Grid>
    );
}