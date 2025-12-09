/**
 * Theme Usage Examples
 * 
 * This file demonstrates various ways to use the dynamic company theme
 * in your components. These are reference examples only.
 */

"use client";

import { useCompanyTheme } from "@/hooks/use-company-theme";
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Typography,
  useTheme,
  alpha 
} from "@mui/material";

// ============================================================================
// Example 1: Accessing MUI Theme
// ============================================================================

export function Example1_BasicThemeUsage() {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        // Using theme colors
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        
        // Using theme spacing
        p: theme.spacing(3),
        m: theme.spacing(2),
        
        // Using theme shape (border radius)
        borderRadius: theme.shape.borderRadius,
        
        // Using theme typography
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.body1.fontSize,
      }}
    >
      Content styled with theme
    </Box>
  );
}

// ============================================================================
// Example 2: Using Company Branding
// ============================================================================

export function Example2_CompanyBranding() {
  const { data: theme } = useCompanyTheme();
  
  return (
    <Box>
      {/* Company Logo */}
      <img 
        src={theme.icon_url} 
        alt="Company Logo"
        style={{ maxWidth: 200 }}
      />
      
      {/* Contact Information */}
      <Typography variant="body2">
        Email: {theme.contact_info.email}
      </Typography>
      <Typography variant="body2">
        Phone: {theme.contact_info.phone}
      </Typography>
      
      {/* Company URL */}
      <Typography variant="caption" color="text.secondary">
        {theme.url}
      </Typography>
    </Box>
  );
}

// ============================================================================
// Example 3: Social Media Links
// ============================================================================

export function Example3_SocialMediaLinks() {
  const { data: theme } = useCompanyTheme();
  
  return (
    <Box display="flex" gap={2}>
      {Object.entries(theme.social_media_links || {}).map(([platform, data]) => {
        if (!data || data.status !== 1) return null;
        
        return (
          <a
            key={platform}
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 1,
                borderRadius: 1,
                bgcolor: "background.neutral",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <img 
                src={data.icon_url} 
                alt={platform}
                style={{ width: 24, height: 24 }}
              />
              <Typography 
                variant="caption" 
                sx={{ textTransform: "capitalize" }}
              >
                {platform}
              </Typography>
            </Box>
          </a>
        );
      })}
    </Box>
  );
}

// ============================================================================
// Example 4: Theme Colors with Variants
// ============================================================================

export function Example4_ThemeColorVariants() {
  const theme = useTheme();
  
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* Primary color variants */}
      <Box display="flex" gap={1}>
        <Box sx={{ bgcolor: "primary.lighter", p: 2, flexGrow: 1 }}>
          Primary Lighter
        </Box>
        <Box sx={{ bgcolor: "primary.light", p: 2, flexGrow: 1 }}>
          Primary Light
        </Box>
        <Box sx={{ 
          bgcolor: "primary.main", 
          color: "primary.contrastText",
          p: 2, 
          flexGrow: 1 
        }}>
          Primary Main
        </Box>
        <Box sx={{ 
          bgcolor: "primary.dark", 
          color: "primary.contrastText",
          p: 2, 
          flexGrow: 1 
        }}>
          Primary Dark
        </Box>
        <Box sx={{ 
          bgcolor: "primary.darker", 
          color: "primary.contrastText",
          p: 2, 
          flexGrow: 1 
        }}>
          Primary Darker
        </Box>
      </Box>
      
      {/* Alpha transparency with primary color */}
      <Box 
        sx={{ 
          bgcolor: alpha(theme.palette.primary.main, 0.5),
          p: 2 
        }}
      >
        Primary with 50% opacity
      </Box>
    </Box>
  );
}

// ============================================================================
// Example 5: Buttons with Theme Colors
// ============================================================================

export function Example5_ThemedButtons() {
  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained" color="error">
        Error
      </Button>
      <Button variant="contained" color="warning">
        Warning
      </Button>
      <Button variant="contained" color="info">
        Info
      </Button>
      <Button variant="outlined" color="primary">
        Outlined
      </Button>
      <Button variant="text" color="primary">
        Text
      </Button>
    </Box>
  );
}

// ============================================================================
// Example 6: Cards with Theme Colors
// ============================================================================

export function Example6_ThemedCards() {
  const { data: theme } = useCompanyTheme();
  
  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      <Card sx={{ minWidth: 200 }}>
        <CardContent>
          <Typography variant="h6" color="primary.main" gutterBottom>
            Primary Card
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Card using primary color
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ 
        minWidth: 200,
        bgcolor: "primary.main",
        color: "primary.contrastText" 
      }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Colored Card
          </Typography>
          <Typography variant="body2">
            Card with primary background
          </Typography>
        </CardContent>
      </Card>
      
      <Card sx={{ minWidth: 200 }}>
        <CardContent>
          <img 
            src={theme.icon_url} 
            alt="Company" 
            style={{ width: 50, height: 50 }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Branded Card
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Card with company branding
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

// ============================================================================
// Example 7: Custom Component with Both Hooks
// ============================================================================

export function Example7_CompleteExample() {
  const theme = useTheme();
  const { data: companyTheme } = useCompanyTheme();
  
  return (
    <Card 
      sx={{ 
        borderRadius: companyTheme.radius / 8, // Use backend radius
        border: `2px solid`,
        borderColor: "primary.main",
      }}
    >
      <CardContent>
        {/* Header with branding */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <img 
            src={companyTheme.icon_url} 
            alt="Company Logo"
            style={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography 
              variant="h6" 
              color="primary.main"
              sx={{ fontWeight: companyTheme.font_weight_bold }}
            >
              {companyTheme.url}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Company Profile
            </Typography>
          </Box>
        </Box>
        
        {/* Content */}
        <Box 
          sx={{ 
            bgcolor: "background.neutral",
            p: 2,
            borderRadius: 1,
            mb: 2,
          }}
        >
          <Typography variant="body2" color="text.primary">
            Email: {companyTheme.contact_info.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Phone: {companyTheme.contact_info.phone}
          </Typography>
        </Box>
        
        {/* Actions */}
        <Box display="flex" gap={1}>
          <Button 
            variant="contained" 
            color="primary"
            fullWidth
          >
            Contact Us
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
            fullWidth
          >
            Learn More
          </Button>
        </Box>
        
        {/* Social Links */}
        <Box mt={2} display="flex" gap={1} justifyContent="center">
          {Object.entries(companyTheme.social_media_links || {}).map(([platform, data]) => {
            if (!data || data.status !== 1) return null;
            
            return (
              <a 
                key={platform}
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box
                  component="img"
                  src={data.icon_url}
                  alt={platform}
                  sx={{
                    width: 32,
                    height: 32,
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
              </a>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// Example 8: Responsive Typography with Theme
// ============================================================================

export function Example8_ResponsiveTypography() {
  const { data: theme } = useCompanyTheme();
  
  return (
    <Box>
      <Typography 
        variant="h1"
        sx={{ 
          fontFamily: theme.font_family,
          fontWeight: theme.font_weight_bold,
        }}
      >
        Heading 1
      </Typography>
      <Typography 
        variant="h2"
        sx={{ 
          fontFamily: theme.font_family,
          fontWeight: theme.font_weight_bold,
        }}
      >
        Heading 2
      </Typography>
      <Typography 
        variant="body1"
        sx={{ 
          fontFamily: theme.font_family,
          fontWeight: theme.font_weight_regular,
        }}
      >
        Body text with custom font family from backend
      </Typography>
      <Typography 
        variant="body2"
        sx={{ 
          fontFamily: theme.font_family,
          fontWeight: theme.font_weight_light,
        }}
      >
        Light weight body text
      </Typography>
    </Box>
  );
}

// ============================================================================
// Example 9: Conditional Styling Based on Theme
// ============================================================================

export function Example9_ConditionalStyling() {
  const { data: theme } = useCompanyTheme();
  
  // Use theme values for conditional styling
  const hasRoundedCorners = theme.radius > 8;
  const useLargeFont = Number(theme.font_size) > 14;
  
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: hasRoundedCorners ? 3 : 1,
        bgcolor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Typography 
        variant={useLargeFont ? "h5" : "h6"}
      >
        Conditionally Styled Content
      </Typography>
      <Typography variant="body2">
        This component adapts based on theme settings
      </Typography>
    </Box>
  );
}

// ============================================================================
// Example 10: Full Page Layout with Theme
// ============================================================================

export function Example10_FullPageLayout() {
  const { data: theme } = useCompanyTheme();
  const muiTheme = useTheme();
  
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
          p: 2,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <img 
              src={theme.icon_url} 
              alt="Logo"
              style={{ height: 40 }}
            />
            <Typography variant="h6" color="primary">
              {theme.url}
            </Typography>
          </Box>
          
          <Box display="flex" gap={1}>
            <Button variant="outlined" color="primary">
              Login
            </Button>
            <Button variant="contained" color="primary">
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h3" color="primary" gutterBottom>
          Welcome
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is a full page layout using the dynamic theme system.
        </Typography>
      </Box>
      
      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: "background.neutral",
          borderTop: 1,
          borderColor: "divider",
          p: 3,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2">
              Contact: {theme.contact_info.email}
            </Typography>
            <Typography variant="body2">
              Phone: {theme.contact_info.phone}
            </Typography>
          </Box>
          
          <Box display="flex" gap={2}>
            {Object.entries(theme.social_media_links || {}).map(([platform, data]) => {
              if (!data || data.status !== 1) return null;
              
              return (
                <a 
                  key={platform}
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img 
                    src={data.icon_url} 
                    alt={platform}
                    style={{ width: 24, height: 24 }}
                  />
                </a>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

