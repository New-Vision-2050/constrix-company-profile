# Theme System Quick Reference

## Import Statements

```tsx
// For MUI theme (colors, typography, spacing)
import { useTheme } from '@mui/material';

// For company data (logo, contacts, social)
import { useCompanyTheme } from '@/hooks/use-company-theme';
```

## Common Usage Patterns

### 1. Use MUI Theme Colors

```tsx
const theme = useTheme();

// In JSX
<Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>

// In JavaScript
const color = theme.palette.primary.main;
```

### 2. Access Company Logo

```tsx
const { data } = useCompanyTheme();

<img src={data.icon_url} alt="Company Logo" />
```

### 3. Display Contact Info

```tsx
const { data } = useCompanyTheme();

<p>Email: {data.contact_info.email}</p>
<p>Phone: {data.contact_info.phone}</p>
```

### 4. Render Social Links

```tsx
const { data } = useCompanyTheme();

{Object.entries(data.social_media_links).map(([platform, info]) => (
  info && info.status === 1 && (
    <a key={platform} href={info.link}>
      <img src={info.icon_url} alt={platform} />
    </a>
  )
))}
```

### 5. Use Theme Typography

```tsx
const { data } = useCompanyTheme();

<Typography sx={{ 
  fontFamily: data.font_family,
  fontWeight: data.font_weight_bold 
}}>
```

### 6. Apply Border Radius

```tsx
const { data } = useCompanyTheme();

<Box sx={{ borderRadius: data.radius / 8 }}>
// Note: MUI theme.shape.borderRadius is already set
```

## Available Theme Colors

All colors automatically include these variants:

- `primary.lighter` - Lightest shade
- `primary.light` - Light shade
- `primary.main` - Main color
- `primary.dark` - Dark shade
- `primary.darker` - Darkest shade
- `primary.contrastText` - Contrast text

Available color palettes:
- `primary`
- `secondary`
- `error`
- `warning`
- `info`
- `text.primary`, `text.secondary`, `text.disabled`
- `background.paper`, `background.default`, `background.neutral`
- `common.black`, `common.white`

## MUI Component Examples

```tsx
// Buttons
<Button variant="contained" color="primary">Primary</Button>
<Button variant="outlined" color="secondary">Secondary</Button>

// Cards
<Card sx={{ bgcolor: 'background.paper' }}>
  <CardContent>
    <Typography color="text.primary">Title</Typography>
    <Typography color="text.secondary">Subtitle</Typography>
  </CardContent>
</Card>

// Papers
<Paper sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
  Content
</Paper>
```

## Theme Data Structure

### Company Theme Data (`useCompanyTheme`)

```typescript
{
  id: string;
  company_id: string;
  url: string;
  radius: number;
  html_font_size: number;
  font_family: string;
  font_size: string;
  font_weight_light: string;
  font_weight_regular: string;
  font_weight_medium: string;
  font_weight_bold: string;
  icon_url: string;
  contact_info: {
    email: string;
    phone: string;
  };
  social_media_links: {
    [platform: string]: {
      id: string;
      link: string;
      status: number;
      icon_url: string;
    };
  };
  color_palettes: { ... };
}
```

### MUI Theme (`useTheme`)

```typescript
{
  palette: {
    primary: PaletteColor;
    secondary: PaletteColor;
    error: PaletteColor;
    warning: PaletteColor;
    info: PaletteColor;
    text: { primary, secondary, disabled };
    background: { paper, default, neutral };
    common: { black, white };
    divider: string;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    fontWeightLight: number;
    fontWeightRegular: number;
    fontWeightMedium: number;
    fontWeightBold: number;
    h1, h2, h3, h4, h5, h6: TypographyStyle;
    body1, body2: TypographyStyle;
    // ...
  };
  shape: {
    borderRadius: number;
  };
  spacing: (factor: number) => string;
  breakpoints: { ... };
}
```

## Common Patterns

### Full-Width Colored Section

```tsx
<Box sx={{ 
  bgcolor: 'primary.main', 
  color: 'primary.contrastText',
  py: 8,
  px: 3 
}}>
  <Typography variant="h3">Section Title</Typography>
</Box>
```

### Card with Company Branding

```tsx
const { data } = useCompanyTheme();

<Card>
  <CardContent>
    <Box display="flex" alignItems="center" gap={2}>
      <img src={data.icon_url} style={{ width: 50 }} />
      <Typography variant="h6">{data.url}</Typography>
    </Box>
  </CardContent>
</Card>
```

### Responsive Container

```tsx
<Container maxWidth="lg" sx={{ py: 4 }}>
  {/* Content */}
</Container>
```

### Grid Layout

```tsx
<Grid container spacing={3}>
  <Grid item xs={12} sm={6} md={4}>
    {/* Item */}
  </Grid>
</Grid>
```

## Testing & Debugging

### View Theme Preview
Navigate to: `/[locale]/theme`

### Check Theme in Console
```tsx
const theme = useTheme();
const { data } = useCompanyTheme();

console.log('MUI Theme:', theme);
console.log('Company Data:', data);
```

### Verify Color Contrast
```tsx
import { alpha } from '@mui/material';

// Add transparency
<Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.5) }}>
```

## Files to Know

| File | Purpose |
|------|---------|
| `src/theme/convert-backend-theme.ts` | Theme conversion logic |
| `src/hooks/use-company-theme.ts` | Hook for company data |
| `src/theme/README.md` | Full documentation |
| `src/examples/theme-usage-examples.tsx` | Example components |
| `/[locale]/theme` | Live theme preview |

## Tips

1. **Always use theme colors** instead of hardcoded hex values
2. **Use sx prop** for styling (not inline styles)
3. **Check theme preview page** when colors look wrong
4. **Use both hooks** when you need MUI theme AND company data
5. **Leverage MUI components** - they're already themed
6. **Use spacing function** - `theme.spacing(2)` instead of px values
7. **Test responsive** - check xs, sm, md, lg breakpoints

## Common Issues

| Problem | Solution |
|---------|----------|
| Theme not loading | Check backend API and domain config |
| Colors wrong | Verify hex codes in backend |
| Type errors | Check backend response structure |
| Logo not showing | Verify `icon_url` is valid URL |
| Social links missing | Check `status` field is `1` |

## Need Help?

1. 📖 Read: `src/theme/README.md`
2. 👀 Check: `src/examples/theme-usage-examples.tsx`
3. 🔍 Test: Navigate to `/theme` page
4. 🐛 Debug: Check browser console
5. 🔧 Verify: Backend API response structure

