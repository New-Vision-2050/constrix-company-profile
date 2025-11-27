import LayoutStack from "@/layouts/main/layout-stack";
import { Typography, Box } from "@mui/material";
import { useTranslations } from "next-intl";
import PartnersRow from "./PartnersRow";
import PageSection from "@/layouts/main/page-section";

/**
 * Partners section with animated scrolling logos
 */
export default function PartnersSection() {
    const t = useTranslations('pages.about.partners');

    return (
        <PageSection>
            <LayoutStack>
                {/* Section title */}
                <Typography variant="h3" textAlign="center" fontWeight={600}>
                    {t('title')}
                </Typography>
                
                {/* Scrolling container with overflow hidden */}
                <Box sx={{ width: '100%', overflow: 'hidden' }}>
                    <PartnersRow />
                </Box>
            </LayoutStack>
        </PageSection>

    );
}