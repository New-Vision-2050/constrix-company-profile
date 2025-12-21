import { baseApi } from "@/lib/axios/instances/base";
import { HomePageResponse } from "./response";

export const HomePageApi = {
  getData: () => baseApi.get<HomePageResponse>("/website-home-page/data"),
};

