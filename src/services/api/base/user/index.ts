import { CreateUserArgs, UpdateUserArgs } from "./types/args";
import { baseApi, baseApiNoAuth } from "@/lib/axios/instances/base";
import { CreateUserResponse, GetMeResponse } from "./types/responses";

export const UserApi = {
  create: (args: CreateUserArgs) =>
    baseApiNoAuth.post<CreateUserResponse>("user/create-user", args),
  updateMe: (args: UpdateUserArgs) =>
    baseApi.put<CreateUserResponse>("user/update-me", args),
  getMe: () => baseApi.get<GetMeResponse>("user/get-me"),
};
