import { Box, Grid, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { BE_FeaturedProject } from "@/types/api/base/project";
import React from "react";

type PropsT = {
    projectData: BE_FeaturedProject;
}

export default function ProjectDetailsSection({ projectData }: PropsT) {
    const t = useTranslations("pages.projectDetails");

    // Get project details content from translations
    const projectDetails = projectData?.project_details || [];

    return (
        <Stack spacing={3}>
            {/* Title */}
            <Typography variant="subtitle1" fontWeight={700}>
                {t('details')}
            </Typography>

            {/* Grid Layout */}
            <Grid container spacing={3}>
                {projectDetails.length > 0 && projectDetails.map((detail) => {
                    return (
                        <React.Fragment key={detail.id}>
                            {/* Details Title */}
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Box
                                    sx={{
                                        p: 1,
                                        bgcolor: 'primary.lighter',
                                        borderRadius: 1,
                                        height: 'fit-content',
                                    }}
                                >
                                    <Stack spacing={1.5}>
                                        <Typography
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {detail?.name || ''}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Grid>
                            {/* Details Description */}
                            <Grid size={{ xs: 12, md: 8 }}>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ whiteSpace: 'pre-line' }}
                                >
                                    {projectData?.description || ''}
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate illum a, reiciendis facere consectetur corrupti provident voluptatem neque quis vitae in repellat velit aperiam tempore sunt. Accusamus saepe est veniam?
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate illum a, reiciendis facere consectetur corrupti provident voluptatem neque quis vitae in repellat velit aperiam tempore sunt. Accusamus saepe est veniam?
                                </Typography>
                            </Grid>
                        </React.Fragment>
                    );
                })}


            </Grid>
        </Stack>
    );
}