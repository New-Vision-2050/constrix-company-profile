"use client";

import { useCompanyTheme } from "@/hooks/use-company-theme";
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Container, 
  Grid, 
  Paper, 
  Stack, 
  Typography,
  useTheme 
} from "@mui/material";

function ThemePage() {
  const { data: theme } = useCompanyTheme();
  const muiTheme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Page Header */}
        <Box>
          <Typography variant="h3" gutterBottom>
            Company Theme Preview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This page demonstrates the dynamic theme system with backend configuration
          </Typography>
        </Box>

        {/* Company Branding */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Company Branding
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Box
                  component="img"
                  src={theme.icon_url}
                  alt="Company Logo"
                  sx={{ maxWidth: 200, height: "auto" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>URL:</strong> {theme.url}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  <strong>Email:</strong> {theme.contact_info.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  <strong>Phone:</strong> {theme.contact_info.phone}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Color Palette
            </Typography>
            <Grid container spacing={2}>
              {/* Primary */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 2, bgcolor: "primary.main", color: "primary.contrastText" }}>
                  <Typography variant="subtitle2">Primary</Typography>
                  <Typography variant="caption">{theme.color_palettes.primary.primary}</Typography>
                </Paper>
              </Grid>

              {/* Secondary */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 2, bgcolor: "secondary.main", color: "secondary.contrastText" }}>
                  <Typography variant="subtitle2">Secondary</Typography>
                  <Typography variant="caption">{theme.color_palettes.secondary.primary}</Typography>
                </Paper>
              </Grid>

              {/* Error */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 2, bgcolor: "error.main", color: "error.contrastText" }}>
                  <Typography variant="subtitle2">Error</Typography>
                  <Typography variant="caption">{theme.color_palettes.error.primary}</Typography>
                </Paper>
              </Grid>

              {/* Warning */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 2, bgcolor: "warning.main", color: "warning.contrastText" }}>
                  <Typography variant="subtitle2">Warning</Typography>
                  <Typography variant="caption">{theme.color_palettes.warning.primary}</Typography>
                </Paper>
              </Grid>

              {/* Info */}
              <Grid item xs={12} sm={6} md={4}>
                <Paper sx={{ p: 2, bgcolor: "info.main", color: "info.contrastText" }}>
                  <Typography variant="subtitle2">Info</Typography>
                  <Typography variant="caption">{theme.color_palettes.info.primary}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Typography
            </Typography>
            <Stack spacing={1}>
              <Typography variant="h1">Heading 1</Typography>
              <Typography variant="h2">Heading 2</Typography>
              <Typography variant="h3">Heading 3</Typography>
              <Typography variant="h4">Heading 4</Typography>
              <Typography variant="h5">Heading 5</Typography>
              <Typography variant="h6">Heading 6</Typography>
              <Typography variant="body1">Body 1 - {theme.font_family}</Typography>
              <Typography variant="body2">Body 2 - Font Size: {theme.font_size}px</Typography>
              <Typography variant="caption">Caption text</Typography>
            </Stack>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Buttons
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button variant="contained" color="primary">
                Primary
              </Button>
              <Button variant="contained" color="secondary">
                Secondary
              </Button>
              <Button variant="outlined" color="primary">
                Outlined
              </Button>
              <Button variant="text" color="primary">
                Text
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        {theme.social_media_links && (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Social Media Links
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(theme.social_media_links).map(([platform, data]) => (
                  data && (
                    <Grid item xs={12} sm={6} md={4} key={platform}>
                      <Paper sx={{ p: 2 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box
                            component="img"
                            src={data.icon_url}
                            alt={platform}
                            sx={{ width: 40, height: 40, objectFit: "contain" }}
                          />
                          <Box>
                            <Typography variant="subtitle2" textTransform="capitalize">
                              {platform}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" noWrap>
                              {data.link}
                            </Typography>
                          </Box>
                        </Stack>
                      </Paper>
                    </Grid>
                  )
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Theme Configuration */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Theme Configuration
            </Typography>
            <Typography variant="body2" component="div">
              <strong>Border Radius:</strong> {theme.radius}px
            </Typography>
            <Typography variant="body2" component="div" sx={{ mt: 1 }}>
              <strong>HTML Font Size:</strong> {theme.html_font_size}px
            </Typography>
            <Typography variant="body2" component="div" sx={{ mt: 1 }}>
              <strong>Font Weights:</strong>
            </Typography>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body2">Light: {theme.font_weight_light}</Typography>
              <Typography variant="body2">Regular: {theme.font_weight_regular}</Typography>
              <Typography variant="body2">Medium: {theme.font_weight_medium}</Typography>
              <Typography variant="body2">Bold: {theme.font_weight_bold}</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Raw Backend Data */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Raw Backend Theme Data
            </Typography>
            <Box
              component="pre"
              sx={{
                bgcolor: "background.neutral",
                p: 2,
                borderRadius: 1,
                overflow: "auto",
                fontSize: "0.875rem",
              }}
            >
              {JSON.stringify(theme, null, 2)}
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}

export default ThemePage;
