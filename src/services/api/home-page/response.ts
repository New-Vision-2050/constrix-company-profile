import { BE_HomePageData } from "@/types/api/base/home-page";

export interface HomePageResponse {
  code: string;
  message: string | null;
  payload: BE_HomePageData;
}
