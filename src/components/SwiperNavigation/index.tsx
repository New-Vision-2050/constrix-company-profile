"use client";

import { Box, Container, Stack } from "@mui/material";
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
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
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ArrowRight2 variant="Outline" size={30} color="#000" />
          </Box>
          <Box
            component="button"
            onClick={() => swiper.slidePrev()}
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ArrowLeft2 variant="Outline" size={30} color="#000" />
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

export default SwiperNavigation;
