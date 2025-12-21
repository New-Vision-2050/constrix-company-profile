import { cache } from "react";
import { ThemeResponse } from "@/services/api/theme/response";
import { ThemeApi } from "@/services/api/theme";

export const getTheme = cache(async (): Promise<ThemeResponse> => {
  const themeRes = await ThemeApi.getTheme();
  return themeRes.data;
});
