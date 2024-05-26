import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Wall, CalculatePaintRequirements } from '../service/paintService';
import { UnprocessableEntityError } from '../errors/unprocessableEntityError';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const walls = req.body as Wall[];
    console.log(walls, req.body);
    const paintService = new CalculatePaintRequirements(walls);
    const { suggestedCans, necessaryPaint } = paintService.calculate();
    return res.status(StatusCodes.OK).json({
      response: {
        tintaNecessaria: necessaryPaint,
        latasSugeridas: suggestedCans,
      },
    });
  } catch (error) {
    return next(new UnprocessableEntityError(error.message));
  }
};
