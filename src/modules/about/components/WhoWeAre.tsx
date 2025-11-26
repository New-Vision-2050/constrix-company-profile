import { Box, alpha } from "@mui/material";

export default function WhoWeAre() {
    return (
        <Box
            sx={({ palette }) => ({
                bgcolor: alpha(palette.primary.main, 0.1),
                width: "100%",
                py: 8,
            })}
        >
            <h1>Who We Are</h1>
        </Box>
    );
}