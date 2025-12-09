export interface BE_DefaultResponse<T> {
  payload: T;
  message: string;
  status: number;
}
