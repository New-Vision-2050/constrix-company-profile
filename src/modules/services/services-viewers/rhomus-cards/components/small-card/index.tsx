"use client";

import AspectRatio from "@/components/ui/others/aspect-ratio";
import BlackOverlay from "@/components/ui/others/overlay";
import { BE_ServicePageItem } from "@/types/api/base/services";
import { Box, Stack, Typography } from "@mui/material";

type SmallCardProps = {
  ratio?: number;
  service: BE_ServicePageItem;
};
function SmallCard({ ratio = 0.75, service }: SmallCardProps) {
  return (
    <AspectRatio ratio={ratio} boxProps={{ sx: { borderRadius: 2 } }}>
      <Stack
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: 1,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${service.main_image})`,
        }}
      >
        <BlackOverlay
          sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <Stack
          spacing={1}
          alignItems="center"
          justifyContent="center"
          zIndex={2}
          p={2}
        >
          <Typography
            variant="caption"
            color="common.white"
            sx={{ opacity: 0.75 }}
            textAlign="center"
            textTransform="uppercase"
          >
            {service.category?.name}
          </Typography>
          <Typography variant="h6" color="common.white" textAlign="center">
            {service.name}
          </Typography>
        </Stack>
      </Stack>
    </AspectRatio>
  );
}

export default SmallCard;
