import PageSection from "@/layouts/main/page-section";
import { Typography } from "@mui/material";

export default function TermsAndConditionsView() {
    return <PageSection>
        {/* Title */}
        <Typography variant="subtitle1" fontWeight={700}>
            Title
        </Typography>
        {/* Description */}
        <Typography
            variant="body2"
            component="div"
            color="text.secondary"
            dangerouslySetInnerHTML={{ __html: "<p>محتوى HTML جاهز</p>" }}
        />

    </PageSection>
}