import { HttpException } from "./root";

export class BadRequestException extends HttpException {
  constructor(message, errorCode) {
    super(message, errorCode, 400, null);
  }
}
