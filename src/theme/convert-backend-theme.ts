import { darken, lighten } from "@mui/material/styles";
import { createPaletteChannel } from "minimal-shared/utils";
import { ThemeResponse } from "@/services/api/theme/response";
import { getHex } from "./get-hex";
import type { ThemeOptions } from "./types";
import type { PaletteColorNoChannels } from "./core/palette";

/**
 * Converts backend theme response to MUI theme options
 *
 * This function transforms the company theme data from the backend API
 * into a format compatible with Material-UI's theme system.
 *
 * Backend color structure:
 * - primary: main color
 * - light: light variant
 * - dark: dark variant
 * - contrast: contrast text color
 *
 * MUI expected structure:
 * - lighter: lightest variant (computed from light)
 * - light: light variant
 * - main: main color (from primary)
 * - dark: dark variant
 * - darker: darkest variant (computed from dark)
 * - contrastText: contrast text color (from contrast)
 *
 * @param theme - The theme payload from the backend API
 * @returns MUI ThemeOptions object
 */
export function convertBackendTheme(
  theme: ThemeResponse["payload"]
): ThemeOptions {
  const {
    color_palettes,
    font_family,
    font_weight_light,
    font_weight_regular,
    font_weight_medium,
    font_weight_bold,
    html_font_size,
    radius,
  } = theme;

  // Helper function to convert backend palette color to MUI format
  const convertPaletteColor = (color: {
    primary?: string;
    light?: string;
    dark?: string;
    contrast?: string;
  }): PaletteColorNoChannels => {
    const mainColor = color.primary || "#000000";

    return {
      lighter: color.light
        ? getHex(lighten(color.light, 0.4))
        : getHex(lighten(mainColor, 0.8)),
      light: color.light || getHex(lighten(mainColor, 0.2)),
      main: mainColor,
      dark: color.dark || getHex(darken(mainColor, 0.2)),
      darker: color.dark
        ? getHex(darken(color.dark, 0.4))
        : getHex(darken(mainColor, 0.4)),
      contrastText: color.contrast || "#FFFFFF",
    };
  };

  // Convert color palettes
  const primaryPalette = createPaletteChannel(
    convertPaletteColor(color_palettes.primary)
  );
  const secondaryPalette = createPaletteChannel(
    convertPaletteColor(color_palettes.secondary)
  );
  const errorPalette = createPaletteChannel(
    convertPaletteColor(color_palettes.error)
  );
  const warningPalette = createPaletteChannel(
    convertPaletteColor(color_palettes.warning)
  );
  const infoPalette = createPaletteChannel(
    convertPaletteColor(color_palettes.info)
  );

  // Convert text colors
  const textPalette = createPaletteChannel({
    primary: color_palettes.text.primary || "#000000",
    secondary: color_palettes.text.secondary || "#757575",
    disabled: color_palettes.text.disabled || "#9E9E9E",
  });

  // Convert background colors
  const backgroundPalette = createPaletteChannel({
    paper: color_palettes.background.paper || "#FFFFFF",
    default: color_palettes.background.default || "#FAFAFA",
    neutral: color_palettes.background.default
      ? getHex(darken(color_palettes.background.default, 0.04))
      : "#F5F5F5",
  });

  // Convert common colors
  const commonPalette = createPaletteChannel({
    black: color_palettes.common.black || "#000000",
    white: color_palettes.common.white || "#FFFFFF",
  });

  // Create the theme options
  const themeOptions: ThemeOptions = {
    colorSchemes: {
      light: {
        palette: {
          primary: primaryPalette,
          secondary: secondaryPalette,
          error: errorPalette,
          warning: warningPalette,
          info: infoPalette,
          text: textPalette,
          background: backgroundPalette,
          common: commonPalette,
          divider: color_palettes.text.divider || "rgba(0, 0, 0, 0.12)",
        },
      },
    },
    typography: {
      fontFamily: font_family || "Roboto, Arial, sans-serif",
      htmlFontSize: html_font_size || 16,
      fontWeightLight: Number(font_weight_light) || 300,
      fontWeightRegular: Number(font_weight_regular) || 400,
      fontWeightMedium: Number(font_weight_medium) || 500,
      fontWeightBold: Number(font_weight_bold) || 700,
    },
    shape: {
      borderRadius: radius || 8,
    },
  };

  return themeOptions;
}
