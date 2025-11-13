"use client";

import React from "react";
import { Box, Grid } from "@mui/material";
import ContactForm from "../contact-form";

import ContactInfo from "../contact-info";

export default function ContactView() {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      <Grid container spacing={12}>
        <Grid size={{ xs: 6 }}>
          <ContactForm />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <ContactInfo />
        </Grid>
      </Grid>
    </Box>
  );
}
