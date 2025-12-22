import { Logo } from "@/components/logo";
import { Stack, Typography } from "@mui/material";
import { Phone as PhoneIcon, Email as EmailIcon } from "@mui/icons-material";
import { useTranslations } from "next-intl";


type PropsT = {
    email?: string;
    phone?: string;
}

export default function FooterLogoContent({ email, phone }: PropsT) {
    const tFooter = useTranslations("footer");

    return (
        <Stack
            spacing={2.5}
            alignItems={{ xs: "center", lg: "flex-start" }}
            sx={{ width: { xs: "100%", lg: "auto" }, minWidth: { lg: 260 } }}
        >
            <Logo
                isSingle={false}
                sx={{ height: { xs: 32, md: 40 }, width: "auto" }}
            />

            {/* Phone */}
            {phone && <Stack
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
                    {tFooter("phoneLabel")}: {phone}
                </Typography>
            </Stack>}
            {/* Email */}
            {email && <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                justifyContent={{ xs: "center", lg: "flex-start" }}
                sx={{ width: "100%" }}
            >
                <EmailIcon
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
                    {tFooter("emailLabel")}: {email}
                </Typography>
            </Stack>}
        </Stack>)
}