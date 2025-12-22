"use client";

import React from "react";
import { Typography, Stack, Link } from "@mui/material";
import {
  Language as LanguageIcon,
} from "@mui/icons-material";
import { useTranslations } from "next-intl";

import LayoutStack from "../main/layout-stack";
import PageSection from "../main/page-section";

import { useBE_Theme } from "@/lib/theme/client/theme-provider";
import FooterLogoContent from "./footer-logo-content";
import FooterSocialLinks from "./footer-social-links";
import FooterBottom from "./footer-bottom";
import FooterNavigation from "./footer-navigation";


export default function FooterSection() {
  const tFooter = useTranslations("footer");

  // get social links
  const { data: themeData } = useBE_Theme();
  const socialLinks = themeData?.social_media_links;
  const contactInfo = themeData?.contact_info;

  return (
    <LayoutStack sx={{ bgcolor: "primary.lighter" }}>
      <PageSection>
        <Stack spacing={{ xs: 4, md: 5 }}>
          {/* Main Footer Content */}
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={{ xs: 4, lg: 3 }}
            alignItems={{ xs: "center", lg: "flex-start" }}
            justifyContent="space-between"
          >
            {/* Left Section: Logo & Contact */}
            <FooterLogoContent
              email={contactInfo?.email}
              phone={contactInfo?.phone}
            />

            {/* Center Section: Navigation */}
            <FooterNavigation />

            {/* Right Section: Language, CTA & Social Media */}
            <Stack
              spacing={2}
              alignItems={{ xs: "center", sm: "flex-start" }}
              sx={{
                width: { xs: "100%", lg: "auto" },
                minWidth: { lg: 260 },
              }}
            >
              {/* Language & CTA */}
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <LanguageIcon sx={{ fontSize: 18 }} />
                  <Typography variant="body2" fontWeight={600}>
                    {tFooter("language")}
                  </Typography>
                </Stack>

                <Link
                  href="#"
                  sx={{
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {tFooter("cta")}
                </Link>
              </Stack>

              {/* Social Media */}
              <FooterSocialLinks
                socialLinks={socialLinks}
              />
            </Stack>
          </Stack>

          {/* Footer Bottom: Terms & Copyright */}
          <FooterBottom />
        </Stack>
      </PageSection>
    </LayoutStack>
  );
}
