'use client'
import { SocialMediaLinks } from "@/services/api/theme/response";
import { IconButton, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo } from "react";


type PropsT = {
    socialLinks: SocialMediaLinks
};

export default function FooterSocialLinks({ socialLinks }: PropsT) {
    const tFooter = useTranslations("footer");
    const socialLinksObj = useMemo(() => {
        return Boolean(socialLinks) ? socialLinks : {}
    }, [socialLinks])

    return (
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
                {Object.entries(socialLinksObj)?.map(([key, value]) => (
                    <IconButton
                        key={key}
                        component="a"
                        href={value.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={value.link}
                        sx={{
                            width: { xs: 44, sm: 48 },
                            height: { xs: 44, sm: 48 },
                            border: 1,
                            color: "primary.main",
                            borderRadius: "50%",
                        }}
                    >
                        <Image src={value.icon_url} alt={key} width={20} height={20} objectFit="contain" style={{ borderRadius: "50%" }} unoptimized />
                    </IconButton>
                ))}
            </Stack>
        </Stack>
    )
}