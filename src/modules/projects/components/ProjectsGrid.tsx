import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { BE_FeaturedProject } from "@/types/api/base/project";
import { GridCardsSkeleton } from "@/components/ui/interactions";
import { ErrorState, NoDataState } from "@/components/shared/states";


type PropsT = {
    projects: BE_FeaturedProject[] | undefined
    isLoading: boolean
    isError: boolean
    onRetry: () => void
}
export default function ProjectsGrid({ projects, isLoading, isError, onRetry }: PropsT) {
    if (isLoading)
        return <GridCardsSkeleton items={8} size={{ xs: 12, sm: 6 }} />

    if (isError)
        return <ErrorState 
            title="Failed to load projects"
            subtitle="We encountered an error while loading the projects. Please try again."
            onRetry={onRetry}
        />

    if (!projects || projects.length === 0)
        return <NoDataState 
            title="No projects found"
            subtitle="There are no projects available at the moment. Check back later for updates."
        />

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