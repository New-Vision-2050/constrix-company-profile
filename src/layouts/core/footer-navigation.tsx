import { Link, Stack } from "@mui/material";
import { RouterLink } from "@/routes/components";
import { useTranslations } from "next-intl";

const navLinks = [
    { key: "home", href: "/", highlight: true },
    { key: "projects", href: "/projects", withDropdown: true },
    { key: "services", href: "/services" },
    { key: "about", href: "/about" },
    { key: "contact", href: "/contact" },
];

export default function FooterNavigation() {
    const tNav = useTranslations("nav");

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
    );
}