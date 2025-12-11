import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { BE_FeaturedProject } from "@/types/api/base/project";
import { GridCardsSkeleton } from "@/components/ui/interactions";


type PropsT = {
    projects: BE_FeaturedProject[] | undefined
    isLoading: boolean
    isError: boolean
}
export default function ProjectsGrid({ projects, isLoading, isError }: PropsT) {
    if (isLoading)
        return <GridCardsSkeleton items={8} size={{ xs: 12, sm: 6 }} />

    if (isError)
        return <ErrorState />

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