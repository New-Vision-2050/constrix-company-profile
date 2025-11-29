"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Facebook,
  Instagram,
  Whatsapp,
  Notification,
  Location,
} from "iconsax-reactjs";

export default function ContactInfo() {
  const t = useTranslations("contactInfo");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const locations = [
    {
      label: t("locations.jeddah"),
      mapUrl:
        "https://www.google.com/maps?q=جدة+حي+النهضة+شارع+الصفا&output=embed",
    },
    {
      label: t("locations.cairo"),
      mapUrl:
        "https://www.google.com/maps?q=القاهرة+مدينة+نصر+26+شارع+محمد+المقريفي&output=embed",
    },
    {
      label: t("locations.makkah"),
      mapUrl:
        "https://www.google.com/maps?q=مكة+المكرمة+24232+الطريق+الدائري+الثالث+الخالدية&output=embed",
    },
    {
      label: t("locations.riyadh"),
      mapUrl:
        "https://www.google.com/maps?q=الرياض+13313+الطريق+الدائري+الوادي&output=embed",
    },
  ];

  const socialMediaIcons = [
    { icon: Facebook, name: "Facebook", variant: "Bold" },
    { icon: Whatsapp, name: "WhatsApp", variant: "Outline" },
    { icon: Instagram, name: "Instagram", variant: "Outline" },
    { icon: Notification, name: "Notification", variant: "Bold" },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 400,
          color: "text.primary",
        }}
      >
        {t("title")}
      </Typography>

      <Stack spacing={4}>
        {/* Email Section */}
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box
            sx={{
              width: 26,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 0.5,
              position: "relative",
            }}
          >
            <Image
              src="/Email.svg"
              alt="Email"
              width={26}
              height={20}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
          <Stack>
            <Typography
              variant="body1"
              sx={{ color: "primary.main", fontWeight: 500, mb: 0.5 }}
            >
              {t("email")}
            </Typography>
            <Typography variant="body1" sx={{ color: "primary.main" }}>
              example@gmail.com
            </Typography>
          </Stack>
        </Stack>

        {/* Addresses Section */}
        <Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems="flex-start"
            sx={{ mb: 2 }}
          >
            <Box
              sx={{
                width: 26,
                height: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 0.5,
                color: "primary.main",
              }}
            >
              <Location size={26} variant="Outline" />
            </Box>
            <Typography
              variant="body1"
              sx={{ color: "primary.main", fontWeight: 500 }}
            >
              {t("addresses")}
            </Typography>
          </Stack>
          <List sx={{ pl: 0 }}>
            {locations.map((location, index) => (
              <ListItem
                key={index}
                onClick={() => setSelectedIndex(index)}
                sx={{
                  cursor: "pointer",
                  px: 0,
                  py: 0.75,
                  borderRadius: 1,
                  color: "primary.main",
                }}
              >
                <ListItemText
                  primary={location.label}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: 700,
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Stack>

        {/* Social Media Icons */}
        <Stack direction="row" spacing={2}>
          {socialMediaIcons.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <IconButton
                key={index}
                sx={{
                  width: 50,
                  height: 50,
                  border: 1,
                  borderColor: "primary.main",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "primary.main",
                }}
              >
                <IconComponent
                  size={32}
                  variant={social.variant as "Bold" | "Outline"}
                />
              </IconButton>
            );
          })}
        </Stack>

        {/* Map Display */}
        <Box
          sx={{
            width: "100%",
            height: 400,
            borderRadius: 2,
            overflow: "hidden",
            border: 1,
            borderColor: "divider",
            mt: 2,
          }}
        >
          <iframe
            key={selectedIndex}
            src={locations[selectedIndex].mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title={`map-${selectedIndex}`}
          ></iframe>
        </Box>
      </Stack>
    </Box>
  );
}
