# Dynamic Company Theme System

This system enables the application to dynamically fetch and apply company-specific themes from a backend API. Each company can have its own branding, colors, typography, and contact information.

## Overview

The theme system consists of several key components:

1. **Backend Theme Fetching** - Server-side theme data retrieval
2. **Theme Conversion** - Converting backend format to MUI format
3. **Theme Application** - Applying the theme to Material-UI components
4. **Theme Access** - Accessing theme data in components

## Architecture

### Flow Diagram

```
Backend API → getTheme() → withBE_ThemeProvider → LocaleLayout
                                    ↓
                              BE_ThemeProvider (Context)
                                    ↓
                              ThemeProvider
                                    ↓
                        convertBackendTheme()
                                    ↓
                            MuiThemeProvider
                                    ↓
                              Components
```

## Backend Response Structure

The backend returns a theme object with the following structure:

```typescript
{
  id: string;
  company_id: string;
  url: string;
  radius: number;                    // Border radius for components
  html_font_size: number;            // Base HTML font size
  font_family: string;               // Primary font family
  font_size: string;                 // Base font size
  font_weight_light: string;         // Light font weight
  font_weight_regular: string;       // Regular font weight
  font_weight_medium: string;        // Medium font weight
  font_weight_bold: string;          // Bold font weight
  color_palettes: {
    background: {
      paper: string;
      default: string;
    };
    common: {
      black: string;
      white: string;
    };
    text: {
      primary: string;
      secondary: string;
      divider: string;
      disabled: string;
    };
    primary: {
      primary: string;               // Main color
      light: string;                 // Light variant
      dark: string;                  // Dark variant
      contrast: string;              // Contrast text
    };
    secondary: { ... };              // Same structure
    error: { ... };
    warning: { ... };
    info: { ... };
  };
  icon_url: string;                  // Company logo/icon
  contact_info: {
    email: string;
    phone: string;
  };
  social_media_links: {
    facebook?: {
      id: string;
      link: string;
      status: number;
      icon_url: string;
    };
    youtube?: { ... };
    // ... other social platforms
  };
}
```

## Color Conversion

The backend uses a different color structure than Material-UI:

| Backend Field | MUI Field      | Description           |
|--------------|----------------|----------------------|
| `primary`    | `main`         | Main color           |
| `light`      | `light`        | Light variant        |
| `dark`       | `dark`         | Dark variant         |
| `contrast`   | `contrastText` | Contrast text color  |
| (computed)   | `lighter`      | Lightest variant     |
| (computed)   | `darker`       | Darkest variant      |

The `convertBackendTheme()` function handles this conversion automatically.

## Usage

### Accessing Theme in Components

#### 1. Using MUI's useTheme Hook

For accessing MUI theme properties (colors, typography, spacing, etc.):

```tsx
import { useTheme } from '@mui/material';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      bgcolor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderRadius: theme.shape.borderRadius,
    }}>
      Content
    </Box>
  );
}
```

#### 2. Using useCompanyTheme Hook

For accessing backend-specific data (logo, contact info, social links):

```tsx
import { useCompanyTheme } from '@/hooks/use-company-theme';

function Header() {
  const { data: theme } = useCompanyTheme();
  
  return (
    <header>
      <img src={theme.icon_url} alt="Company Logo" />
      <a href={`mailto:${theme.contact_info.email}`}>
        {theme.contact_info.email}
      </a>
      <a href={`tel:${theme.contact_info.phone}`}>
        {theme.contact_info.phone}
      </a>
    </header>
  );
}
```

#### 3. Using Social Media Links

```tsx
import { useCompanyTheme } from '@/hooks/use-company-theme';

function SocialLinks() {
  const { data: theme } = useCompanyTheme();
  
  return (
    <div>
      {Object.entries(theme.social_media_links).map(([platform, data]) => (
        data && data.status === 1 && (
          <a key={platform} href={data.link} target="_blank" rel="noopener noreferrer">
            <img src={data.icon_url} alt={platform} />
          </a>
        )
      ))}
    </div>
  );
}
```

### Using Theme Colors with MUI Components

The theme colors are automatically applied to all MUI components:

```tsx
import { Button, Paper, Typography } from '@mui/material';

function Example() {
  return (
    <>
      {/* Primary color from backend */}
      <Button variant="contained" color="primary">
        Primary Button
      </Button>
      
      {/* Secondary color from backend */}
      <Button variant="contained" color="secondary">
        Secondary Button
      </Button>
      
      {/* Paper background from backend */}
      <Paper sx={{ p: 2 }}>
        <Typography color="text.primary">
          Primary text color from backend
        </Typography>
        <Typography color="text.secondary">
          Secondary text color from backend
        </Typography>
      </Paper>
      
      {/* Error, Warning, Info colors */}
      <Button color="error">Error</Button>
      <Button color="warning">Warning</Button>
      <Button color="info">Info</Button>
    </>
  );
}
```

## Theme Testing

Visit `/theme` page to see a comprehensive preview of the applied theme, including:

- Company branding and contact information
- Color palette with all variants
- Typography examples
- Button styles
- Social media links
- Raw backend theme data

## Customization

### Overriding Theme Values

You can still override theme values at the component level:

```tsx
<Button 
  sx={{ 
    bgcolor: '#custom-color',
    '&:hover': {
      bgcolor: '#custom-hover-color',
    }
  }}
>
  Custom Button
</Button>
```

### Extending the Theme

To add custom theme properties, update the theme types:

1. Add to `src/theme/types.ts`
2. Update `convertBackendTheme()` function
3. Update backend response types

## Multi-Tenancy Support

This system is designed for multi-tenancy:

- **Same Application**: One codebase
- **Multiple Domains**: Each domain can have its own theme
- **Single Deployment**: One deployment serves all companies
- **Automatic Theme Selection**: Theme is fetched based on the requesting domain

The `getTheme()` function automatically determines which company's theme to load based on the current domain.

## Performance Considerations

- **Server-Side Fetching**: Theme is fetched on the server, reducing client-side requests
- **Caching**: The `getTheme()` function uses React's `cache()` to avoid duplicate requests
- **Context Provider**: Theme data is provided via context to avoid prop drilling

## Troubleshooting

### Theme Not Applying

1. Check that the backend API is returning valid data
2. Verify the domain is correctly configured in the backend
3. Check console for errors in `convertBackendTheme()`

### Colors Look Wrong

1. Verify color values in the backend are valid hex codes
2. Check that contrast colors provide sufficient contrast
3. Use the `/theme` page to preview all colors

### Type Errors

1. Ensure backend response matches `ThemeResponse` type
2. Check that all required fields are present in the response
3. Update types in `src/services/api/theme/response.ts` if backend changes

## Files Reference

- `src/theme/convert-backend-theme.ts` - Theme conversion logic
- `src/lib/providers/theme/index.tsx` - Main theme provider
- `src/lib/theme/server/get-theme.ts` - Server-side theme fetching
- `src/lib/theme/server/with-theme-provider.tsx` - HOC for providing theme
- `src/lib/theme/client/theme-provider.tsx` - Client-side theme context
- `src/hooks/use-company-theme.ts` - Hook for accessing theme data
- `src/app/[locale]/(main)/theme/page.tsx` - Theme preview page

