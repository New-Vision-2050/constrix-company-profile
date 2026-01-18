"use client";

import {
  Typography,
  Stack,
  Box,
  Button,
  useTheme,
  styled,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import NavigationContainer from "@/components/SwiperNavigation";
import DarkGradiantBgCard from "@/components/ui/others/card/dark-gradiant-bg";
import { DocumentDownload } from "iconsax-reactjs";
import { AboutPageAttachmentType } from "@/types/api/base/about-page";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import BaseOnViewDiv from "@/components/motion/on-view";

interface FilesSliderProps {
  files: AboutPageAttachmentType[];
}

const FileIcon = styled(DocumentDownload)(({ theme }) => ({
  color: theme.palette.primary.lighter,
}));

export default function FilesSlider({ files }: FilesSliderProps) {
  const t = useTranslations("about");
  const theme = useTheme();

  if (!files || files.length === 0) {
    return null;
  }

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          mb: 4,
          fontWeight: 700,
        }}
      >
        {t("files")}
      </Typography>

      <Box sx={{ overflow: "hidden" }} component={BaseOnViewDiv}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              stopOnLastSlide: false,
              pauseOnMouseEnter: false,
            }}
            speed={1250}
            loop={files.length > 3}
            slidesPerView={1}
            spaceBetween={20}
            centeredSlides
            breakpoints={{
              640: {
                slidesPerView: 1.1,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 1.4,
                spaceBetween: 30,
              },
            }}
            navigation={false}
            className="files-swiper"
          >
            {files.map((file) => (
              <SwiperSlide key={file.id}>
                <DarkGradiantBgCard
                  sx={{
                    p: 4,
                    height: "280px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* PDF Icon Background */}
                  <Box
                    sx={{
                      position: "absolute",
                      right: 20,
                      bottom: "0%",
                      opacity: 0.2,
                    }}
                  >
                    <FileIcon size={250} />
                  </Box>

                  {/* Content */}
                  <Stack
                    spacing={2}
                    sx={{
                      width: "100%",
                      zIndex: 1,
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      {file.name}
                    </Typography>

                    <Stack spacing={1} sx={{ width: "100%" }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ width: "100%" }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.grey[300] }}
                        >
                          {t("fileSize")}:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.common.white }}
                        >
                          54 MB
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ width: "100%" }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.grey[300] }}
                        >
                          {t("fileType")}:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.common.white }}
                        >
                          PDF
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>

                  {/* Download Button */}
                  <Button
                    variant="outlined"
                    href={file.attachment_url || "#"}
                    target="_blank"
                    sx={{
                      color: theme.palette.common.white,
                      borderColor: theme.palette.divider,
                      "&:hover": {
                        borderColor: theme.palette.common.white,
                        backgroundColor: theme.palette.action.hover,
                      },
                      zIndex: 1,
                    }}
                  >
                    {t("downloadFile")}
                  </Button>
                </DarkGradiantBgCard>
              </SwiperSlide>
            ))}
            <NavigationContainer />
          </Swiper>
        </Box>
      </Box>
    </>
  );
}
