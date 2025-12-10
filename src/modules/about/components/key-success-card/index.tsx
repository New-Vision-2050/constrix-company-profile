"use client";
import DarkGradiantBgCard from "@/components/ui/others/card/dark-gradiant-bg";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Variants, motion } from "framer-motion";
import { Arrow } from "iconsax-reactjs";

function KeySuccessCard() {
  const { palette } = useTheme();

  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      boxShadow: `0 0 25px 0 ${palette.primary.lighter}`,
    },
  };

  return (
    <DarkGradiantBgCard
      component={motion.div}
      variants={variants}
      whileInView="visible"
      whileHover="hover"
      initial="hidden"
      sx={{
        bgcolor: "primary.darker",
        color: "primary.contrastText",
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Box
            component={motion.div}
            style={{
              width: 48,
              minWidth: 48,
              height: 48,
              minHeight: 48,
            }}
            variants={{
              hover: {
                scale: 1.3,
                rotate: 360,
              },
              visible: {
                borderRadius: "50%",
                backgroundColor: palette.common.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <Arrow color={palette.primary.main} size={32} />
          </Box>
          <Box>
            <Typography variant="h5">Something</Typography>
            <Typography variant="subtitle2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
              porro suscipit, beatae corporis expedita natus sapiente provident!
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </DarkGradiantBgCard>
  );
}

export default KeySuccessCard;
