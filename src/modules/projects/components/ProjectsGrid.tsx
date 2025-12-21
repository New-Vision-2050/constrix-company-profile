import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { BE_FeaturedProject } from "@/types/api/base/project";
import { GridCardsSkeleton } from "@/components/ui/interactions";
import { ErrorState, NoDataState } from "@/components/shared/states";
import { useTranslations } from "next-intl";


type PropsT = {
    projects: BE_FeaturedProject[] | undefined
    isLoading: boolean
    isError: boolean
    onRetry: () => void
}
export default function ProjectsGrid({ projects, isLoading, isError, onRetry }: PropsT) {
    // get translations
    const t = useTranslations("pages.projects");

    // loading state
    if (isLoading)
        return <GridCardsSkeleton items={8} size={{ xs: 12, sm: 6 }} />

    // error state
    if (isError)
        return <ErrorState 
            title={t("error.title")}
            subtitle={t("error.subtitle")}
            onRetry={onRetry}
        />

    // no projects found state
    if (!isLoading && !isError && (!projects || projects.length === 0))
        return <NoDataState 
            title={t("noProjectsFound")}
            subtitle={t("noProjectsFoundDescription")}
        />

    // projects found state
    return (
        <Grid container spacing={6}>
            {projects?.map((project, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6 }}>
                    <ProjectCard project={project} />
                </Grid>
            ))}
        </Grid>
    );
}