import axios from "axios";
import { addAuthorizationHeader } from "../../interceptors/add-auth";
import { addLangHeader } from "../../interceptors/add-lang";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const baseApi = axios.create({
  baseURL,
});
baseApi.interceptors.request.use(addAuthorizationHeader);
baseApi.interceptors.request.use(addLangHeader);

export const baseApiNoAuth = axios.create({
  baseURL,
});
baseApiNoAuth.interceptors.request.use(addLangHeader);
