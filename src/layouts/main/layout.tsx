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
import { HeaderSection, TOP_NAVBAR_HEIGHT } from "../core/header-section";
import { LayoutSection } from "../core/layout-section";
import { LanguagePopover } from "../components/language-popover";
import { Logo } from "@/components/logo";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useTranslations } from "next-intl";
import { usePathname, Link as RouterLink } from "@/i18n/navigation";

import type { MainSectionProps } from "../core/main-section";
import type { HeaderSectionProps } from "../core/header-section";
import type { LayoutSectionProps } from "../core/layout-section";
import FooterSection from "../core/footer-section";
import { publicNavItems } from "../config-navigation";

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, "sx" | "children" | "cssVars">;

export type MainLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
  };
};

export function MainLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = "md",
}: MainLayoutProps) {
  const theme = useTheme();
  const t = useTranslations();
  const pathname = usePathname();
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  // Remove locale prefix from pathname (e.g., /en/about -> /about)
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");
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
          {publicNavItems.map((item) => {
            const isActive =
              pathWithoutLocale === item.path ||
              (item.path !== "/" && pathWithoutLocale.startsWith(item.path));

            return (
              <Link
                key={item.path}
                component={RouterLink}
                href={item.path}
                underline="none"
                sx={{
                  typography: "subtitle2",
                  fontWeight: 600,
                  color: isActive ? "primary.main" : "text.primary",
                  transition: "color 0.2s",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {t(item.title)}
              </Link>
            );
          })}
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
      sx={{ pt: `${TOP_NAVBAR_HEIGHT}px`, ...sx }}
    >
      {renderMain()}
    </LayoutSection>
  );
}
