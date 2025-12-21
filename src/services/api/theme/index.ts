import { baseApi } from "@/lib/axios/instances/base";
import { ThemeResponse } from "./response";

export const ThemeApi = {
  getTheme: () =>
    baseApi.get<ThemeResponse>(
      "/website-themes/current-company-with-attributes"
    ),
};
