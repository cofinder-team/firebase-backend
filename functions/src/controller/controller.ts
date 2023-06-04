import { Request, Response, RequestHandler, NextFunction } from 'express';
import store from '../lib/database/store';
import { BadRequestException } from '../lib/exception/http.exception';

export const getItem: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { itemId, optionId } = req.params;
  const { care, unopened } = req.query;

  try {
    store
      .collection('item')
      .where('itemId', '==', itemId)
      .where('optionId', '==', optionId)
      .where('care', '==', care)
      .where('unopened', '==', unopened)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          res.status(200).json(data);
        } else {
          next(new BadRequestException('요청한 정보가 존재하지 않습니다.'));
        }
      });
  } catch (error) {
    next(error);
  }
};
