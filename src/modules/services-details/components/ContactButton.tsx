'use client';

import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

export default function ServiceDetailsContactBtn() {
    const t = useTranslations("pages.serviceDetails");

    return <Button sx={{ borderRadius: '4px', fontSize: '1rem', fontWeight: 400 }}>
        {t('contactViaWhatsapp')}
    </Button>
}