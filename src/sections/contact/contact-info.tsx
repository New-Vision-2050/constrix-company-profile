"use client";

import React, { useState } from "react";
import { Box, Typography, Stack, Tabs, Tab } from "@mui/material";
import { useTranslations } from "next-intl";

export default function ContactInfo() {
  const t = useTranslations("contactInfo"); // same namespace as ContactForm
  const [selectedIndex, setSelectedIndex] = useState(0);

  const locations = [
    {
      label: t("locations.jeddah"),
      mapUrl:
        "https://www.google.com/maps?q=جدة+حي+الروضة+شارع+الصفا&output=embed",
    },
    {
      label: t("locations.cairo"),
      mapUrl:
        "https://www.google.com/maps?q=القاهرة+مدينة+نصر+26+شارع+محمد+المقرن&output=embed",
    },
    {
      label: t("locations.makkah"),
      mapUrl:
        "https://www.google.com/maps?q=مكة+المكرمة+الطريق+الدائري+الثالث&output=embed",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t("title")}
      </Typography>

      {/* Email */}
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Stack direction="column" sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {t("email")}
          </Typography>
          <Typography variant="body1" color="secondary">
            example@gmail.com
          </Typography>
        </Stack>

        {/* Addresses */}
        <Stack>
          <Typography variant="h6">{t("addresses")}</Typography>
        </Stack>

        {/* Map Tabs */}
        <Box sx={{ width: "100%", color: "text.secondary", fontSize: 14 }}>
          <Tabs
            value={selectedIndex}
            onChange={(e, newValue) => setSelectedIndex(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="location tabs"
            textColor="secondary"
            indicatorColor="secondary"
          >
            {locations.map((loc, i) => (
              <Tab key={i} label={loc.label} sx={{ fontSize: 14 }} />
            ))}
          </Tabs>

          {/* Map Display */}
          <Box
            sx={{
              mt: 2,
              width: "100%",
              height: 400,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <iframe
              src={locations[selectedIndex].mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="map"
            ></iframe>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
