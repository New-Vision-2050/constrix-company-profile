"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { portfolioDataAtom, getLocalized } from "@/store/portfolio";
import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { useLocale } from "next-intl";

export default function TestimonialsPage() {
  const [data] = useAtom(portfolioDataAtom);
  const locale = useLocale();

  return (
    <Box sx={{ p: { xs: 4, md: 8 }, minHeight: '80vh', bgcolor: '#f9f9f9', display: 'flex', flexDirection: 'column' }}>
      
      {/* Title */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
        <Box sx={{ border: '2px solid', borderColor: alpha('#000', 0.1), px: { xs: 4, md: 8 }, py: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: 4 }}>
            {getLocalized(data.testimonials.title, locale)}
          </Typography>
        </Box>
      </Box>

      {/* Grid Content */}
      <Grid container spacing={4} sx={{ maxWidth: 1000, mx: 'auto' }}>
        {data.testimonials.items && data.testimonials.items.length > 0 ? (
          data.testimonials.items.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  bgcolor: '#fff',
                  p: 4,
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  height: '100%',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    ...(locale === 'ar' ? { right: 0 } : { left: 0 }),
                    width: 4,
                    height: '100%',
                    bgcolor: data.settings.colors.primary,
                    borderRadius: locale === 'ar' ? '0 8px 8px 0' : '8px 0 0 8px',
                  }
                }}
              >
                <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3, color: 'text.secondary', lineHeight: 1.8 }}>
                  "{getLocalized(item.text, locale)}"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    component="img"
                    src={item.avatar}
                    sx={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {getLocalized(item.author, locale)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: data.settings.colors.primary, fontWeight: 600 }}>
                      {getLocalized(item.role, locale)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))
        ) : (
          <Box sx={{ width: '100%', textAlign: 'center', py: 10 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              {locale === 'en' ? "No testimonials yet." : "لا توجد توصيات بعد."}
            </Typography>
          </Box>
        )}
      </Grid>
      
    </Box>
  );
}
