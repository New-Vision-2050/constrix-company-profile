"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Link,
} from "@mui/material";
import {
  IconBrandFacebookFilled,
  IconBrandX,
  IconBrandYoutubeFilled,
  IconChevronDown,
  IconPhoneCall,
  IconWorld,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import { Logo } from "@/components/logo";
import { RouterLink } from "@/routes/components";

const navLinks = [
  { key: "home", href: "/", highlight: true },
  { key: "projects", href: "/projects", withDropdown: true },
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

const socialLinks = [
  {
    key: "youtubeLabel",
    href: "https://youtube.com",
    Icon: IconBrandYoutubeFilled,
  },
  { key: "xLabel", href: "https://x.com", Icon: IconBrandX },
  {
    key: "facebookLabel",
    href: "https://facebook.com",
    Icon: IconBrandFacebookFilled,
  },
];

export default function FooterSection() {
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("nav");

  const sanitizedPhone = tFooter("phoneValue").replace(/[^\d+]/g, "");

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        color: "text.primary",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 4, md: 5 }}>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            alignItems={{ xs: "flex-start", lg: "center" }}
            justifyContent="space-between"
            spacing={{ xs: 4, lg: 3 }}
            useFlexGap
          >
            <Stack
              spacing={2.5}
              alignItems={{ xs: "center", lg: "flex-start" }}
              textAlign={{ xs: "center", lg: "left" }}
              sx={{ minWidth: { lg: 260 } }}
            >
              <Logo
                isSingle={false}
                sx={{
                  height: { xs: 32, md: 40 },
                }}
              />

              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                width="100%"
                justifyContent={{ xs: "center", lg: "flex-start" }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                  }}
                >
                  <IconPhoneCall size={22} stroke={1.8} />
                </Box>
                <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    {tFooter("phoneLabel")}
                  </Typography>
                  <Link
                    href={`tel:${sanitizedPhone}`}
                    underline="none"
                    sx={{
                      display: "block",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "text.primary",
                    }}
                  >
                    {tFooter("phoneValue")}
                  </Link>
                </Box>
              </Stack>

              <Link
                component={RouterLink}
                href="/terms"
                underline="hover"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  fontSize: 14,
                }}
              >
                {tFooter("terms")}
              </Link>
            </Stack>

            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ flexGrow: 1 }}
            >
              <Stack
                direction="row"
                spacing={{ xs: 2, sm: 3 }}
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
                useFlexGap
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
                      color: item.highlight ? "primary.main" : "text.primary",
                      fontSize: 15,
                      position: "relative",
                      textTransform: "none",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {tNav(item.key)}
                    {item.withDropdown && (
                      <IconChevronDown size={16} stroke={2} />
                    )}
                  </Link>
                ))}
              </Stack>
            </Stack>

            <Stack
              spacing={2}
              alignItems={{
                xs: "center",
                sm: "flex-start",
              }}
              textAlign={{ xs: "center", sm: "left" }}
              sx={{ minWidth: { lg: 260 } }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                flexWrap="wrap"
                useFlexGap
                justifyContent={{ xs: "center", sm: "flex-start" }}
              >
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <IconWorld size={18} />
                  <Typography variant="body2" fontWeight={600}>
                    {tFooter("language")}
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    bgcolor: "text.secondary",
                    opacity: 0.4,
                  }}
                />

                <Link
                  href="#"
                  underline="none"
                  sx={{ fontWeight: 700, color: "primary.main", fontSize: 14 }}
                >
                  {tFooter("cta")}
                </Link>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                flexWrap="wrap"
                useFlexGap
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
                      aria-label={tFooter(key)}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,                       
                      }}
                    >
                      <Icon size={20} stroke={1.8} />
                    </IconButton>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign={{ xs: "center", lg: "right" }}
          >
            © {tFooter("rights")}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
