import { BE_DefaultResponse } from "@/types/api/base/common/default-response";
import { TermsAndCondition } from "@/types/api/base/terms";

export interface TermsResponse
    extends BE_DefaultResponse<TermsAndCondition> { }

