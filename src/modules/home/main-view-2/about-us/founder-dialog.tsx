"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  useTheme,
  Stack,
  Divider,
} from "@mui/material";
import { CloseCircle } from "iconsax-reactjs";
import { BE_Founder } from "@/types/api/base/home-page";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface FounderDialogProps {
  open: boolean;
  onClose: () => void;
  founder: BE_Founder;
}

export default function FounderDialog({
  open,
  onClose,
  founder,
}: FounderDialogProps) {
  const theme = useTheme();
  const t = useTranslations("home");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
      scroll="body"
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 2,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          {t("founderDetails")}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseCircle size={24} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* Founder Image */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 300, sm: 400 },
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Image
              src={founder.personal_photo}
              alt={founder.name}
              fill
              style={{
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)",
              }}
            />
          </Box>

          {/* Founder Info */}
          <Box px={4} mt={-4}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                mb: 1,
              }}
            >
              {founder.name}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.dark,
                opacity: 0.8,
                mb: 2,
              }}
            >
              {founder.job_title}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: theme.palette.text.secondary,
                whiteSpace: "pre-wrap",
              }}
            >
              {founder.description}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
