"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { portfolioDataAtom, getLocalized } from "@/store/portfolio";
import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { useLocale } from "next-intl";

export default function AboutPage() {
  const [data] = useAtom(portfolioDataAtom);
  const locale = useLocale();

  return (
    <Box sx={{ minHeight: '80vh', bgcolor: '#f5f5f5', py: 8, px: { xs: 4, md: 8 } }}>
      
      {/* Title */}
      <Typography variant="h2" sx={{ fontWeight: 800, letterSpacing: 8, mb: 8, textAlign: 'center' }}>
        {getLocalized(data.about.title, locale)}
      </Typography>

      {/* Content */}
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, letterSpacing: 2, textTransform: 'uppercase' }}>
          {locale === 'en' ? "WHO AM I?" : "من أنا؟"}
        </Typography>
        
        {/* About Text Card */}
        <Box sx={{ 
          bgcolor: '#fff', 
          p: 4, 
          borderRadius: 2, 
          mb: 4,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
          }
        }}>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
            {getLocalized(data.about.content, locale)}
          </Typography>
        </Box>

        {/* Info Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ 
              bgcolor: '#fff', 
              p: 3, 
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
              }
            }}>
              <Box sx={{ 
                bgcolor: data.settings.colors.primary, 
                px: 2, 
                py: 1, 
                borderRadius: 1,
                mb: 2,
                textAlign: 'center'
              }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#000' }}>
                  {locale === 'en' ? "Name" : "الاسم"}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                {getLocalized(data.home.name, locale)}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ 
              bgcolor: '#fff', 
              p: 3, 
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
              }
            }}>
              <Box sx={{ 
                bgcolor: data.settings.colors.primary, 
                px: 2, 
                py: 1, 
                borderRadius: 1,
                mb: 2,
                textAlign: 'center'
              }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#000' }}>
                  {locale === 'en' ? "Email" : "البريد"}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', wordBreak: 'break-word' }}>
                {data.contact.email}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ 
              bgcolor: '#fff', 
              p: 3, 
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
              }
            }}>
              <Box sx={{ 
                bgcolor: data.settings.colors.primary, 
                px: 2, 
                py: 1, 
                borderRadius: 1,
                mb: 2,
                textAlign: 'center'
              }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#000' }}>
                  {locale === 'en' ? "Phone" : "الهاتف"}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                {data.contact.phone}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ 
              bgcolor: '#fff', 
              p: 3, 
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
              }
            }}>
              <Box sx={{ 
                bgcolor: data.settings.colors.primary, 
                px: 2, 
                py: 1, 
                borderRadius: 1,
                mb: 2,
                textAlign: 'center'
              }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#000' }}>
                  {locale === 'en' ? "Location" : "الموقع"}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                {getLocalized(data.contact.address, locale)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
    </Box>
  );
}
