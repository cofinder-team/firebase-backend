import { Request, Response, RequestHandler, NextFunction } from 'express';

export const getItem: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { itemId, optionId } = req.params;
  console.log(itemId, optionId);

  try {
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
