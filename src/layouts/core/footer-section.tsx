"use client";

import React from "react";
import { Typography, Stack, IconButton, Link } from "@mui/material";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  WhatsApp as WhatsAppIcon,
  CameraAlt as SnapchatIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
} from "@mui/icons-material";
import { useTranslations } from "next-intl";

import { Logo } from "@/components/logo";
import { RouterLink } from "@/routes/components";
import LayoutStack from "../main/layout-stack";
import PageSection from "../main/page-section";

const navLinks = [
  { key: "home", href: "/", highlight: true },
  { key: "projects", href: "/projects", withDropdown: true },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

const socialLinks = [
  { key: "snapchat", href: "https://snapchat.com", Icon: SnapchatIcon },
  { key: "instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { key: "whatsapp", href: "https://whatsapp.com", Icon: WhatsAppIcon },
  { key: "facebook", href: "https://facebook.com", Icon: FacebookIcon },
] as const;

export default function FooterSection() {
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("nav");

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
            <Stack
              spacing={2.5}
              alignItems={{ xs: "center", lg: "flex-start" }}
              sx={{ width: { xs: "100%", lg: "auto" }, minWidth: { lg: 260 } }}
            >
              <Logo
                isSingle={false}
                sx={{ height: { xs: 32, md: 40 }, width: "auto" }}
              />

              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                justifyContent={{ xs: "center", lg: "flex-start" }}
                sx={{ width: "100%" }}
              >
                <PhoneIcon
                  sx={{
                    fontSize: 24,
                    color: "primary.main",
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.primary"
                  fontWeight={600}
                  sx={{
                    textAlign: { xs: "center", lg: "left" },
                    wordBreak: "break-word",
                  }}
                >
                  {tFooter("phoneLabel")}: {tFooter("phoneValue")}
                </Typography>
              </Stack>
            </Stack>

            {/* Center Section: Navigation */}
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ flexGrow: 1, width: { xs: "100%", lg: "auto" } }}
            >
              <Stack
                direction="row"
                spacing={{ xs: 1.5, sm: 2, md: 3 }}
                alignItems="center"
                justifyContent="center"
              >
                {navLinks.map((item) => (
                  <Link
                    key={item.key}
                    component={RouterLink}
                    href={item.href}
                    underline="none"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      fontWeight: 600,
                      fontSize: { xs: 14, sm: 15 },
                      color: item.highlight ? "primary.main" : "text.primary",
                      textTransform: "none",
                      transition: "color 0.2s ease",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {tNav(item.key)}
                  </Link>
                ))}
              </Stack>
            </Stack>

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
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                <Typography variant="body2" fontWeight={600}>
                  {tFooter("contactLabel")}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {socialLinks.map(({ key, Icon, href }) => (
                    <IconButton
                      key={key}
                      component="a"
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={key}
                      sx={{
                        width: { xs: 44, sm: 48 },
                        height: { xs: 44, sm: 48 },
                        border: 1,
                        color: "primary.main",
                        borderRadius: "50%",
                      }}
                    >
                      <Icon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                    </IconButton>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          {/* Footer Bottom: Terms & Copyright */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2 }}
            alignItems="center"
            justifyContent={{ xs: "center", lg: "space-between" }}
            flexWrap="wrap"
            useFlexGap
            sx={{
              pt: { xs: 2, md: 0 },
              borderTop: { xs: 1, md: 0 },
              borderColor: "divider",
            }}
          >
            <Link
              component={RouterLink}
              href="/terms"
              underline="hover"
              sx={{
                fontWeight: 600,
                fontSize: { xs: 13, sm: 14 },
                color: "text.primary",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              {tFooter("terms")}
            </Link>
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                fontSize: { xs: 13, sm: 14 },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              © {tFooter("rights")}
            </Typography>
          </Stack>
        </Stack>
      </PageSection>
    </LayoutStack>
  );
}
