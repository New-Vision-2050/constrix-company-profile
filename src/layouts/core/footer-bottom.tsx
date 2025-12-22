import { Link, Stack, Typography } from "@mui/material";
import { RouterLink } from "@/routes/components";
import { useTranslations } from "next-intl";


export default function FooterBottom() {
    const tFooter = useTranslations("footer");

    return (
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
    )
}