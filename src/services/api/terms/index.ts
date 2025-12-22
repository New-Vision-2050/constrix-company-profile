import { baseApi } from "@/lib/axios/instances/base";
import { TermsResponse } from "./response";

export const TermsApi = {
  getTerms: () =>
    baseApi.get<TermsResponse>(
      "/website-term-and-conditions/current"
    ),
};

