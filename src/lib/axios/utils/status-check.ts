import { AxiosError } from "axios";

export const axiosErrorTypeCheck = (error: AxiosError, status: number) => {
  return Math.floor((error?.response?.status || 0) / 100) * 100 === status;
};

export const axiosStatus = {
  isBadRequest: (error: AxiosError) => axiosErrorTypeCheck(error, 400),
  isServerError: (error: AxiosError) => axiosErrorTypeCheck(error, 500),
  isSuccess: (error: AxiosError) => axiosErrorTypeCheck(error, 200),
  isRedirect: (error: AxiosError) => axiosErrorTypeCheck(error, 300),
};
