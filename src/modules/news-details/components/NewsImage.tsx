import { Box } from "@mui/material";
import Image from "next/image";

interface NewsImageProps {
  src: string;
  alt: string;
}

/**
 * Displays the main news image with proper aspect ratio and optimization
 * Uses Next.js Image component for performance
 */
export default function NewsImage({ src, alt }: NewsImageProps) {
  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: '100%', sm: '100%', md: '70%' },
        height: { xs: 250, sm: 350, md: 450 },
        borderRadius: 2,
        overflow: "hidden",
        mb: 4,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "cover" }}
        priority
      />
    </Box>
  );
}


