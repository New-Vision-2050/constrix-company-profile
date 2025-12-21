import Link from "next/link";
import { Stack, Typography } from "@mui/material";
import AspectRatio from "@/components/ui/others/aspect-ratio";
import { BE_FeaturedProject } from "@/types/api/base/project";


type PropsT = {
    project: BE_FeaturedProject
}

export default function ProjectCard({ project }: PropsT) {
    return (
        <Stack 
            spacing={1} 
            component={Link} 
            href={`/projects/${project.id}`}
            sx={{
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                    textDecoration: 'none',
                    color: 'inherit',
                },
            }}
        >
            {/* project image */}
            <AspectRatio ratio={16 / 9} boxProps={{ sx: { borderRadius: 1.5 } }}>
                <img
                    src={project.main_image}
                    alt={project.name ?? 'project image'}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </AspectRatio>
            {/* project title  - with small text*/}
            <Typography variant="body2" color="text.secondary">{project.name ?? 'project title'}</Typography>
            {/* project name - with small text*/}
            <Typography variant="h6">{project.description ?? 'project name'}</Typography>
        </Stack>
    );
}