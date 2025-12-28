import { Link, Stack } from "@mui/material";
import { RouterLink } from "@/routes/components";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { publicNavItems } from "../config-navigation";

export default function FooterNavigation() {
  const t = useTranslations();
  const pathname = usePathname();

  // Remove locale prefix from pathname (e.g., /en/about -> /about)
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");

  return (
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
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                fontWeight: 600,
                fontSize: { xs: 14, sm: 15 },
                color: isActive ? "primary.main" : "text.primary",
                textTransform: "none",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              {t(item.title)}
            </Link>
          );
        })}
      </Stack>
    </Stack>
  );
}
