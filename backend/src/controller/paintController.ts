import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Wall, CalculatePaintRequirements } from '../service/paintService';
import { UnprocessableEntityError } from '../errors/unprocessableEntityError';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const walls = req.body.walls as Wall[];
    const paintService = new CalculatePaintRequirements(walls);
    const { suggestedCans, necessaryPaint } = paintService.calculate();
    return res.status(StatusCodes.OK).json({
      tintaNecessaria: necessaryPaint,
      latasSugeridas: suggestedCans,
    });
  } catch (error) {
    return next(new UnprocessableEntityError(error.message));
  }
};
