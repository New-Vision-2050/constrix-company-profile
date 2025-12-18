import { baseApi } from "@/lib/axios/instances/base";
import { CreateContactMessageResponse } from "./response";

export interface ContactMessagePayload {
  name: string;
  phone: string;
  email: string;
  address: string;
  message: string;
}

export const ContactApi = {
  create: (data: ContactMessagePayload) =>
    baseApi.post<CreateContactMessageResponse>(
      "/website-contact-messages",
      data
    ),
};
