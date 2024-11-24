export default class ApiResponse<T, U> {
  private readonly response: Response<T, U>;

  constructor(response: Response<T, U>) {
    this.response = response;
  }

  serialize() {
    const { statusCode, ...rest } = this.response;
    return rest;
  }

  get statusCode() {
    return this.response.statusCode;
  }

  static success<T>(data: Omit<SuccessResponse<T>, 'success'>) {
    return new ApiResponse<true, T>({
      success: true,
      message: data.message,
      data: data.data,
      statusCode: data.statusCode,
      error: null,
    });
  }

  static failure<U>(data: Omit<ErrorResponse<U>, 'success'>) {
    return new ApiResponse<false, U>({
      success: false,
      message: data.message,
      data: null,
      error: data.error,
      statusCode: data.statusCode,
    });
  }
}

type Response<T, U> = T extends true
  ? SuccessResponse<U> & {
      error: null;
    }
  : ErrorResponse<U> & {
      data: null;
    };

type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  statusCode: number;
};

type ErrorResponse<T> = {
  success: false;
  message: string;
  error: T;
  statusCode: number;
};
