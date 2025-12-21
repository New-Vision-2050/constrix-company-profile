import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";


type PropsT = {
    description?: string;
}
export default function ProjectDescriptionSection({ description }: PropsT) {
    const t = useTranslations("pages.projectDetails");

    return (
        <Stack spacing={2} my={2}>
            {/* title */}
            <Typography variant="subtitle2">
                {t('description')}
            </Typography>
            {/* description */}
            <Typography variant="body1">
                {description}
            </Typography> 
        </Stack>
    )
}