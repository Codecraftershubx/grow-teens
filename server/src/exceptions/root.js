// message, status code, error code, error

export class HttpException extends Error {
  constructor(statusCode, message, errorCode, error) {
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.error = error;
    super(message);
  }
}

export const ErrorCodes =  {
  USER_NOT_FOUND: 1001,
  USER_ALREADY_EXISTS: 1002,
  INCORRECT_PASSWORD: 1003,
}