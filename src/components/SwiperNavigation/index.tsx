"use client";

import { Box, Container, Stack } from "@mui/material";
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";
import { useSwiper } from "swiper/react";
import { useLocale } from "next-intl";

function SwiperNavigation() {
  const swiper = useSwiper();
  const locale = useLocale();
  const isRTL = locale === "ar";

  // In RTL: swap the arrow icons (right becomes left, left becomes right)
  const NextIcon = isRTL ? ArrowRight2 : ArrowLeft2;
  const PrevIcon = isRTL ? ArrowLeft2 : ArrowRight2;

  return (
    <Box>
      <Stack direction={"row"} spacing={2} py={6} alignItems={"center"}>
        <Stack direction="row" spacing={2}>
          <Box
            component="button"
            onClick={() => (isRTL ? swiper.slidePrev() : swiper.slideNext())}
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
            <NextIcon variant="Outline" size={30} color="#000" />
          </Box>
          <Box
            component="button"
            onClick={() => (isRTL ? swiper.slideNext() : swiper.slidePrev())}
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
            <PrevIcon variant="Outline" size={30} color="#000" />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default SwiperNavigation;
