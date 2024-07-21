export interface BaseResponse<T> {
  abCode: string;
  code: number;
  status: number;
  message: string;
  timestamp: string;
  result: T;
}
