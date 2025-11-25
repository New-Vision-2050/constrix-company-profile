import ThemeProvider from "@/lib/providers/theme";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import "./global.css";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { _langs } from "@/_mock";
import ReactQueryClientProvider from "@/lib/providers/react-query";
import { Metadata } from "next";
import { getServerThemeMode } from "@/lib/theme/server";

export const metadata: Metadata = {
  title: { default: "Constrix", template: "%s - Constrix" },
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const direction = _langs.find((l) => l.value === locale)?.direction || "ltr";
  const themeMode = await getServerThemeMode();
  
  return (
    <NextIntlClientProvider>
      <html lang={locale} dir={direction}>
        <body>
          <ReactQueryClientProvider>
            <ThemeProvider direction={direction} defaultMode={themeMode}>
              {children}
            </ThemeProvider>
          </ReactQueryClientProvider>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
