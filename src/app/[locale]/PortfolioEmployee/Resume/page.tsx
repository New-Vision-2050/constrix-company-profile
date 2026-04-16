"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { portfolioDataAtom, getLocalized } from "@/store/portfolio";
import { alpha } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { useLocale } from "next-intl";

export default function ResumePage() {
  const [data] = useAtom(portfolioDataAtom);
  const locale = useLocale();

  return (
    <Box sx={{ minHeight: '80vh', bgcolor: '#f5f5f5', py: 8, px: { xs: 4, md: 8 } }}>
      
      {/* Title */}
      <Typography variant="h2" sx={{ fontWeight: 800, letterSpacing: 8, mb: 2, textAlign: 'center' }}>
        {getLocalized(data.resume.title, locale)}
      </Typography>
      <Box sx={{ width: 60, height: 4, bgcolor: data.settings.colors.primary, mx: 'auto', mb: 8 }} />

      {/* Education Section */}
      <Box sx={{ mb: 8, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center' }}>
          {locale === 'en' ? 'EDUCATION' : 'التعليم'}
        </Typography>
        <Grid container spacing={3}>
          {data.resume.education.map((edu, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ 
                bgcolor: '#fff', 
                p: 3, 
                borderRadius: 2, 
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                }
              }}>
                <Box sx={{ 
                  bgcolor: data.settings.colors.primary, 
                  px: 2, 
                  py: 0.5, 
                  borderRadius: 1,
                  display: 'inline-block',
                  mb: 2
                }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#000' }}>
                    {getLocalized(edu.degree, locale)}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  {getLocalized(edu.school, locale)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  {getLocalized(edu.description, locale)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Experience Section */}
      <Box sx={{ mb: 8, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center' }}>
          {locale === 'en' ? 'EXPERIENCE' : 'الخبرات'}
        </Typography>
        <Grid container spacing={3}>
          {data.resume.experience.map((exp, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ 
                bgcolor: '#fff', 
                p: 3, 
                borderRadius: 2, 
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                }
              }}>
                <Box sx={{ 
                  bgcolor: data.settings.colors.primary, 
                  px: 2, 
                  py: 0.5, 
                  borderRadius: 1,
                  display: 'inline-block',
                  mb: 2
                }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#000' }}>
                    {getLocalized(exp.role, locale)}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  {getLocalized(exp.company, locale)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  {getLocalized(exp.description, locale)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Skills Section */}
      <Box sx={{ mb: 8, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center' }}>
          {locale === 'en' ? 'SKILLS' : 'المهارات'}
        </Typography>
        <Grid container spacing={3}>
          {data.resume.skills.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
                  py: 0.5, 
                  borderRadius: 1,
                  display: 'inline-block',
                  mb: 2
                }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#000' }}>
                    {getLocalized(skill.name, locale)}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {locale === 'en' ? 'Proficiency' : 'الإتقان'}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      {skill.level}%
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    width: '100%', 
                    height: 8, 
                    bgcolor: alpha('#000', 0.1), 
                    borderRadius: 1,
                    overflow: 'hidden'
                  }}>
                    <Box sx={{ 
                      width: `${skill.level}%`, 
                      height: '100%', 
                      bgcolor: data.settings.colors.primary,
                      transition: 'width 0.5s ease'
                    }} />
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Languages Section */}
      <Box sx={{ mb: 8, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center' }}>
          {locale === 'en' ? 'LANGUAGES' : 'اللغات'}
        </Typography>
        <Grid container spacing={3}>
          {data.resume.languages.map((lang, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
                  py: 0.5, 
                  borderRadius: 1,
                  display: 'inline-block',
                  mb: 2
                }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#000' }}>
                    {getLocalized(lang.name, locale)}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                  {getLocalized(lang.level, locale)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Certifications Section */}
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center' }}>
          {locale === 'en' ? 'CERTIFICATIONS' : 'الشهادات'}
        </Typography>
        <Grid container spacing={3}>
          {data.resume.certifications.map((cert, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
                  py: 0.5, 
                  borderRadius: 1,
                  display: 'inline-block',
                  mb: 2
                }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#000' }}>
                    {getLocalized(cert.name, locale)}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {getLocalized(cert.issuer, locale)}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {cert.year}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      
    </Box>
  );
}
