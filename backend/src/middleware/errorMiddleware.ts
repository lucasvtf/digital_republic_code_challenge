import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

interface ICustomError {
  statusCode?: number;
  message: string;
}

export const ErrorHandler = (
  err: ICustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: err.message });
};
