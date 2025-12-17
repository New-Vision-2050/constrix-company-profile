import { baseApi } from "@/lib/axios/instances/base";
import { AboutPageResponse } from "./response";

export const AboutPageApi = {
  getData: () => baseApi.get<AboutPageResponse>("website-about-us/web"),
};
