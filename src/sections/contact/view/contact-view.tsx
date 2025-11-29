"use client";

import React from "react";
import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import PageSection from "@/layouts/main/page-section";
import { Grid } from "@mui/material";
import ContactForm from "../contact-form";
import ContactInfo from "../contact-info";
import { useTranslations } from "next-intl";

export default function ContactView() {
  const t = useTranslations("navigation");

  return (
    <MainPageContent title={"Contact Us"}>
      <LayoutStack>
        <PageSection>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ContactForm />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ContactInfo />
            </Grid>
          </Grid>
        </PageSection>
      </LayoutStack>
    </MainPageContent>
  );
}
