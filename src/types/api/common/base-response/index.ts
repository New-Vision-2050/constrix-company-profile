export interface BE_BaseResponse<T = any> {
  code: string;
  message: any;
  payload: T;
}
