export type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  statusCode: number;
};

export type ErrorResponse<T> = {
  success: false;
  message: string;
  error: T;
  statusCode: number;
};
