"use client";
import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import PageSection from "@/layouts/main/page-section";
import { RouterLink } from "@/routes/components";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function Error({ error }: { error: Error }) {
    // get translations
    const t = useTranslations("pages.error");

    return (
        <MainPageContent title={t("title")}>
            <LayoutStack>
                <PageSection>
                    <Stack spacing={2} alignItems="center" justifyContent="center">
                        {/* title */}
                        <Typography variant="h6" color="error">{error.message}</Typography>
                        {/* message */}
                        <Typography variant="body1">{error.stack}</Typography>
                        {/* icon */}
                        <Box
                            component="img"
                            src="/assets/icons/navbar/ic-patient.webp"
                            sx={{
                                width: 320,
                                height: "auto",
                                my: { xs: 5, sm: 10 },
                            }}
                        />
                        {/* button */}
                        <Button
                            component={RouterLink}
                            href="/"
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
                            {t("buttonText")}
                        </Button>
                    </Stack>
                </PageSection>
            </LayoutStack>
        </MainPageContent>
    );
}