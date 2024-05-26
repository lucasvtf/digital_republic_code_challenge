import { StatusCodes } from 'http-status-codes';

export class UnprocessableEntityError extends Error {
  statusCode = StatusCodes.UNPROCESSABLE_ENTITY;

  constructor(message: string) {
    super(
      message ||
        "It's not possible to proceed with the request due to the absence of necessary or invalid data."
    );
  }
}
