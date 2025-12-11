import { Stack, Typography } from "@mui/material";
import AspectRatio from "@/components/ui/others/aspect-ratio";


export default function ProjectCard() {
    return (
        <Stack spacing={1}>
            {/* project image */}
            <AspectRatio ratio={0.85} boxProps={{ sx: { borderRadius: 1.5 } }}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/250px-Image_created_with_a_mobile_phone.png"
                    alt="Detailed Card"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </AspectRatio>
            {/* project name  - with small text*/}
            <Typography variant="body2" color="text.secondary">project name</Typography>
            {/* project title - with small text*/}
            <Typography variant="h6">Project Title - longer than project name</Typography>
        </Stack>
    );
}