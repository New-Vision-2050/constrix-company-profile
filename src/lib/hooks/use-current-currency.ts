import { useCallback } from "react";

export interface CurrencyFormatOptions {
  showSymbol?: boolean;
  decimals?: number;
  locale?: string;
}

export function useCurrentCurrency() {
  // TODO: This should be configurable per workspace
  // For now, we'll use EGP (Egyptian Pound) as default
  const currency = "EGP";
  const symbol = "ج.م";
  const locale = "en-US"; // Use English locale for consistent number formatting

  const formatPrice = useCallback(
    (amount: number, options: CurrencyFormatOptions = {}): string => {
      const {
        showSymbol = true,
        decimals = 2,
        locale: customLocale = "en-US", // Force English numbers
      } = options;

      const formatted = new Intl.NumberFormat(customLocale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(amount);

      return showSymbol ? `${formatted} ${symbol}` : formatted;
    },
    [symbol]
  );

  const calculateDiscount = useCallback(
    (price: number, discountPercent?: number): number => {
      if (!discountPercent || discountPercent <= 0) return price;
      return price - (price * discountPercent) / 100;
    },
    []
  );

  const formatPriceWithDiscount = useCallback(
    (
      price: number,
      discountPercent?: number
    ): {
      original: string;
      discounted?: string;
      hasDiscount: boolean;
    } => {
      const hasDiscount = !!discountPercent && discountPercent > 0;

      return {
        original: formatPrice(price),
        discounted: hasDiscount
          ? formatPrice(calculateDiscount(price, discountPercent))
          : undefined,
        hasDiscount,
      };
    },
    [formatPrice, calculateDiscount]
  );

  return {
    currency,
    symbol,
    locale,
    formatPrice,
    calculateDiscount,
    formatPriceWithDiscount,
  };
}
