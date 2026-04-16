"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAtom } from "jotai";
import { portfolioDataAtom, getLocalized } from "@/store/portfolio";
import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Iconify } from "@/components/iconify";
import { useLocale } from "next-intl";

export default function ContactPage() {
  const [data] = useAtom(portfolioDataAtom);
  const locale = useLocale();

  return (
    <Box sx={{ p: { xs: 4, md: 8 }, minHeight: '80vh', bgcolor: '#fff', display: 'flex', flexDirection: 'column' }}>
      
      {/* Title */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
        <Box sx={{ border: '2px solid', borderColor: alpha('#000', 0.1), px: { xs: 4, md: 8 }, py: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: 4 }}>
            {getLocalized(data.contact.title, locale)}
          </Typography>
        </Box>
      </Box>

      {/* Grid Content */}
      <Grid container spacing={8} sx={{ maxWidth: 1000, mx: 'auto' }}>
        
        {/* Info Column */}
        <Grid item xs={12} md={5}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, letterSpacing: 1.5 }}>
            {locale === 'en' ? "GET IN TOUCH" : "تواصل معي"}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: data.settings.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                <Iconify icon="mingcute:location-fill" width={24} />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{locale === 'en' ? "Location" : "الموقع"}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{getLocalized(data.contact.address, locale)}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: data.settings.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                <Iconify icon="mingcute:mail-fill" width={24} />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{locale === 'en' ? "Email" : "البريد الإلكتروني"}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{data.contact.email}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: data.settings.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                <Iconify icon="mingcute:phone-fill" width={24} />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{locale === 'en' ? "Phone" : "الهاتف"}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{data.contact.phone}</Typography>
              </Box>
            </Box>

          </Box>
        </Grid>

        {/* Form Column */}
        <Grid item xs={12} md={7}>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label={locale === 'en' ? "Your Name" : "الاسم"} variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label={locale === 'en' ? "Your Email" : "البريد الإلكتروني"} variant="outlined" />
              </Grid>
            </Grid>
            <TextField fullWidth label={locale === 'en' ? "Subject" : "الموضوع"} variant="outlined" />
            <TextField fullWidth label={locale === 'en' ? "Message" : "الرسالة"} variant="outlined" multiline rows={4} />
            <Button
              variant="contained"
              sx={{
                mt: 2,
                py: 1.5,
                bgcolor: data.settings.colors.primary,
                color: '#000',
                fontWeight: 700,
                alignSelf: 'flex-start',
                '&:hover': {
                  bgcolor: alpha(data.settings.colors.primary, 0.8),
                }
              }}
            >
              {locale === 'en' ? "SEND MESSAGE" : "إرسال الرسالة"}
            </Button>
          </Box>
        </Grid>

      </Grid>
      
    </Box>
  );
}
