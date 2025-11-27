"use client";

import { Box, Container, Stack } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSwiper } from "swiper/react";

function SwiperNavigation() {
  const swiper = useSwiper();

  return (
    <Container maxWidth={"xl"}>
      <Stack direction={"row"} spacing={2} py={6} alignItems={"center"}>
        <Stack direction="row" spacing={2}>
          <Box
            component="button"
            onClick={() => swiper.slideNext()}
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "#616161",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#757575",
                transform: "scale(1.05)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
          >
            <ChevronRightIcon sx={{ color: "#fff", fontSize: 24 }} />
          </Box>
          <Box
            component="button"
            onClick={() => swiper.slidePrev()}
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "#616161",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#757575",
                transform: "scale(1.05)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
          >
            <ChevronLeftIcon sx={{ color: "#fff", fontSize: 24 }} />
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

export default SwiperNavigation;
