import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
    return (
        <Grid container spacing={3}>
            {Array.from({ length: 4 }).map((_, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6 }}>
                    <ProjectCard />
                </Grid>
            ))}
        </Grid>
    );
}