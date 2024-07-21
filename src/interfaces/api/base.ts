export interface BaseResponse<T> {
  code: number;
  status: number;
  message: string;
  timestamp: string;
  result: T;
}
