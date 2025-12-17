import { BE_HomePageData } from "@/types/api/base/home-page";
import { BE_DefaultResponse } from "@/types/api/base/common/default-response";
import { AboutPagePayload } from "@/types/api/base/about-page";

export interface AboutPageResponse
  extends BE_DefaultResponse<AboutPagePayload> {}
