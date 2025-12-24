"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  MenuItem,
  MenuList,
} from "@mui/material";
import { useTranslations } from "next-intl";
import {
  Facebook,
  Instagram,
  Whatsapp,
  Notification,
  Location,
  Sms,
} from "iconsax-reactjs";
import { useBE_Theme } from "@/lib/theme/client/theme-provider";
import { useQuery } from "@tanstack/react-query";
import { AddressesApi } from "@/services/api/addresses";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useLocale } from "next-intl";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

export default function ContactInfo() {
  const t = useTranslations("contactInfo");
  const locale = useLocale();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data } = useQuery({
    queryKey: ["ContactInfo", "addresses-list"],
    queryFn: () => AddressesApi.getData(),
  });
  const BE_Theme = useBE_Theme();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const addresses = data?.data.payload || [];
  const selectedAddress = addresses[selectedIndex];

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
        {BE_Theme.data.contact_info.email && (
          <Stack direction="row" spacing={2} alignItems="flex-start">
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
              <Sms size={26} variant="Outline" />
            </Box>
            <Stack>
              <Typography
                variant="body1"
                sx={{ color: "primary.main", fontWeight: 500, mb: 0.5 }}
              >
                {t("email")}
              </Typography>
              <Typography variant="body1" sx={{ color: "primary.main" }}>
                {BE_Theme.data.contact_info.email}
              </Typography>
            </Stack>
          </Stack>
        )}

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
          <MenuList sx={{ p: 0 }}>
            {addresses.map((address, index) => (
              <MenuItem
                key={address.id}
                selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
                sx={{
                  borderRadius: 1,
                  color: "primary.main",
                  fontWeight: 700,
                }}
              >
                {locale === "ar" ? address.title_ar : address.title_en}
              </MenuItem>
            ))}
          </MenuList>
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
        {selectedAddress && isLoaded && (
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
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={{
                lat: parseFloat(selectedAddress.latitude),
                lng: parseFloat(selectedAddress.longitude),
              }}
              zoom={15}
            >
              <Marker
                position={{
                  lat: parseFloat(selectedAddress.latitude),
                  lng: parseFloat(selectedAddress.longitude),
                }}
              />
            </GoogleMap>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
