"use client";
import type { Breakpoint } from "@mui/material/styles";

import { merge } from "es-toolkit";
import { useBoolean } from "minimal-shared/hooks";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";

import { _langs } from "@/_mock";

import { NavMobile } from "./nav";
import { mainLayoutVars } from "./css-vars";
import { MainSection } from "../core/main-section";
import { MenuButton } from "../components/menu-button";
import { HeaderSection } from "../core/header-section";
import { LayoutSection } from "../core/layout-section";
import { LanguagePopover } from "../components/language-popover";
import { Logo } from "@/components/logo";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { RouterLink } from "@/routes/components";
import { useTranslations } from "next-intl";

import type { MainSectionProps } from "../core/main-section";
import type { HeaderSectionProps } from "../core/header-section";
import type { LayoutSectionProps } from "../core/layout-section";
import { FooterSection } from "../core/footer-section";

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, "sx" | "children" | "cssVars">;

export type MainLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
  };
};

// Public navigation items
const publicNavItems = [
  { title: "nav.home", path: "/" },
  { title: "nav.services", path: "/services" },
  { title: "nav.news", path: "/news" },
  { title: "nav.about", path: "/about" },
  { title: "nav.contact", path: "/contact" },
];

export function MainLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = "md",
}: MainLayoutProps) {
  const theme = useTheme();
  const t = useTranslations();
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();
  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps["slotProps"] = {
      container: {
        maxWidth: "lg",
      },
    };

    const headerSlots: HeaderSectionProps["slots"] = {
      topArea: (
        <Alert severity="info" sx={{ display: "none", borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      leftArea: (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/** @slot Mobile menu button */}
          <MenuButton
            onClick={onOpen}
            sx={{
              [theme.breakpoints.up(layoutQuery)]: { display: "none" },
            }}
          />

          {/** @slot Logo */}
          <Logo
            isSingle={false}
            sx={{
              height: { xs: 32, md: 40 },
            }}
          />

          {/** @slot Mobile drawer */}
          <NavMobile data={publicNavItems} open={open} onClose={onClose} />
        </Box>
      ),
      centerArea: (
        <Box
          component="nav"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {publicNavItems.map((item) => (
            <Link
              key={item.path}
              component={RouterLink}
              href={item.path}
              underline="none"
              sx={{
                typography: "subtitle2",
                fontWeight: 600,
                color: "text.primary",
                transition: "color 0.2s",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              {t(item.title)}
            </Link>
          ))}
        </Box>
      ),
      rightArea: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {/** @slot Language popover */}
          <LanguagePopover data={_langs} />

          {/** @slot Subscribe button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 3,
              py: 1,
              borderRadius: 1,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {t("nav.subscribe")}
          </Button>
        </Box>
      ),
    };

    return (
      <HeaderSection
        disableElevation
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () => <FooterSection />;

  const renderMain = () => (
    <MainSection {...slotProps?.main}>{children}</MainSection>
  );

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ ...mainLayoutVars(theme), ...cssVars }}
      sx={sx}
    >
      {renderMain()}
    </LayoutSection>
  );
}
