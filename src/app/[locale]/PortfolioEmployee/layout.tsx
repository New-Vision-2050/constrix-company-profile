"use client";

import { usePathname } from "next/navigation";
import { MainLayout } from "@/layouts/main";
import Box from "@mui/material/Box";
import { useAtom } from "jotai";
import { portfolioDataAtom, getLocalized } from "@/store/portfolio";
import { Iconify } from "@/components/iconify";
import Link from "next/link";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const [data] = useAtom(portfolioDataAtom);
  const pathname = usePathname();
  const theme = useTheme();
  const locale = useLocale();
  const isRtl = theme.direction === 'rtl';
  
  // To handle hydration mismatch with Jotai / visibility setting
  const [mounted, setMounted] = useState(false);

  // Visibility Check (Hidden by default unless accessed via defined URL)
  const isAllowedUrl = typeof window !== 'undefined' && window.location.href.includes(data.settings.allowedUrl);
  
  useEffect(() => {
    setMounted(true);
    if (isAllowedUrl && data.settings.allowedUrl) {
      localStorage.setItem('portfolio_access', data.settings.allowedUrl);
    }
  }, [isAllowedUrl, data.settings.allowedUrl]);

  if (!mounted) return null;

  const hasAccess = typeof window !== 'undefined' && localStorage.getItem('portfolio_access') === data.settings.allowedUrl;
  const isDev = process.env.NODE_ENV === 'development';

  if (!isDev && (!data.settings.isVisible || (!isAllowedUrl && !hasAccess))) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h4">Portfolio is currently hidden.</Typography>
          <Typography variant="body2" color="text.secondary">
            (It is hidden because of the visibility requirement. To view in production, append ?{data.settings.allowedUrl} to the URL)
          </Typography>
        </Box>
      </MainLayout>
    );
  }

  const isHome = pathname.toLowerCase().includes('/homeemployee');

  return (
    <MainLayout>
      <Box sx={{ position: 'relative', display: 'flex', width: '100%', minHeight: 'calc(100vh - 80px)' }}>

        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, position: 'relative', bgcolor: data.settings.colors.background }}>
          {children}
        </Box>

        {/* Right Sidebar (Only for non-home pages) */}
        {!isHome && (
          <Box sx={{ 
            width: 300, 
            flexShrink: 0,
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            bgcolor: data.settings.colors.primary,
          }}>
            <Box
              component="img"
              src={data.about.profileImage}
              sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', filter: 'grayscale(100%)' }}
            />
            <Box sx={{ py: 5, px: 3, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
              {data.navigation.map((nav) => (
                <Link key={nav.id} href={`/${locale}${nav.path}`} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: pathname.toLowerCase().includes(nav.path.toLowerCase()) ? '#000' : alpha('#000', 0.6),
                      fontWeight: pathname.toLowerCase().includes(nav.path.toLowerCase()) ? 700 : 500,
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                      '&:hover': { color: '#000' },
                      transition: 'color 0.2s',
                    }}
                  >
                    {getLocalized(nav.label, locale)}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>
        )}

        {/* Floating Nav Bar */}
        <Box
          sx={{
            position: 'fixed',
            ...(isRtl ? { left: 24 } : { right: 24 }),
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: data.settings.colors.primary,
            borderRadius: 4,
            py: 2,
            px: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            zIndex: 1100,
            boxShadow: theme.customShadows?.z8 || '0 8px 16px rgba(0,0,0,0.1)',
          }}
        >
          {data.navigation.map((nav) => {
            const isActive = pathname.toLowerCase().includes(nav.path.toLowerCase());
            const isImageIcon = nav.icon.startsWith('/');
            return (
              <Link key={nav.id} href={`/${locale}${nav.path}`}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? '#fff' : '#000',
                    transition: 'color 0.2s',
                    '&:hover': { color: '#fff' },
                  }}
                >
                  {isImageIcon ? (
                    <Box
                      component="img"
                      src={nav.icon}
                      sx={{
                        width: 28,
                        height: 28,
                        objectFit: 'cover',
                        borderRadius: '50%',
                        filter: isActive ? 'none' : 'grayscale(100%) brightness(0.2)',
                        transition: 'filter 0.2s',
                        '&:hover': { filter: 'none' },
                      }}
                    />
                  ) : (
                    <Iconify icon={nav.icon} width={24} />
                  )}
                </Box>
              </Link>
            );
          })}
        </Box>

      </Box>
    </MainLayout>
  );
}
