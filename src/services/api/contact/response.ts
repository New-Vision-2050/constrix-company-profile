import { BE_BaseResponse } from "@/types/api/common/base-response";

export interface ContactMessage {
  name: string;
  phone: string;
  email: string;
  address: string;
  message: string;
}

export interface CreateContactMessageResponse extends BE_BaseResponse<ContactMessage> {}

