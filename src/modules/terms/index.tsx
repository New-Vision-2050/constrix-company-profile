import PageSection from "@/layouts/main/page-section";
import { TermsAndCondition } from "@/types/api/base/terms";
import { Typography } from "@mui/material";


type PropsT = {
    termsData: TermsAndCondition
}

export default function TermsAndConditionsView({ termsData }: PropsT) {
    return <PageSection>
        {/* Title */}
        {/* <Typography variant="subtitle1" fontWeight={700}>
            Title
        </Typography> */}
        {/* Description */}
        <Typography
            variant="body2"
            component="div"
            dangerouslySetInnerHTML={{ __html: termsData?.content ?? '' }}
        />

    </PageSection>
}