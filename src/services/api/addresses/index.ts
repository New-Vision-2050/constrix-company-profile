import { baseApi } from "@/lib/axios/instances/base";
import { ListAddressesResponse } from "./response";

export const AddressesApi = {
  getData: () => baseApi.get<ListAddressesResponse>("website-addresses"),
};
