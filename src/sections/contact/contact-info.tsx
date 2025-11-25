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
import NotificationsIcon from "@mui/icons-material/Notifications";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import LocationIcon from "@mui/icons-material/LocationOn";
import { useTranslations } from "next-intl";

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
    { icon: NotificationsIcon, name: "NotificationsIcon" },
    { icon: InstagramIcon, name: "Instagram" },
    { icon: WhatsAppIcon, name: "WhatsApp" },
    { icon: FacebookIcon, name: "Facebook" },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 600,
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
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 0.5,
              color: "primary.main",
            }}
          >
            <EmailIcon sx={{ fontSize: 24 }} />
          </Box>
          <Stack>
            <Typography
              variant="body1"
              sx={{ color: "primary.main", fontWeight: 500, mb: 0.5 }}
            >
              {t("email")}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.primary" }}>
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
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 0.5,
                color: "primary.main",
              }}
            >
              <LocationIcon sx={{ fontSize: 24 }} />
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
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                  backgroundColor:
                    selectedIndex === index ? "action.selected" : "transparent",
                }}
              >
                <ListItemText
                  primary={location.label}
                  primaryTypographyProps={{
                    variant: "body2",
                    sx: {
                      color: "text.primary",
                      fontWeight: selectedIndex === index ? 500 : 400,
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
                  width: 48,
                  height: 48,
                  border: 2,
                  borderColor: "primary.main",
                  borderRadius: "50%",
                  color: "text.primary",
                  p: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: "primary.lighter",
                    borderColor: "primary.dark",
                  },
                }}
              >
                <IconComponent
                  sx={{
                    fontSize: 24,
                    color: "text.primary",
                  }}
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
