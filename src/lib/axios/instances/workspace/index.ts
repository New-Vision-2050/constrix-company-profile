import axios from "axios";
import { addAuthorizationHeader } from "../../interceptors/add-auth";
import { addLangHeader } from "../../interceptors/add-lang";
import { addWorkspaceHeader } from "../../interceptors/add-workspace";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const workspaceApi = axios.create({
  baseURL,
});

// Add all interceptors including workspace
workspaceApi.interceptors.request.use(addAuthorizationHeader);
workspaceApi.interceptors.request.use(addLangHeader);
workspaceApi.interceptors.request.use(addWorkspaceHeader);
