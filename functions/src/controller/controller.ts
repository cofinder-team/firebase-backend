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
    const itemSnapshot = await store
      .collection('item')
      .where('itemId', '==', itemId)
      .where('optionId', '==', optionId)
      .where('care', '==', care)
      .where('unopened', '==', unopened)
      .get();

    if (itemSnapshot.empty) {
      next(new BadRequestException('요청한 정보가 존재하지 않습니다.'));
    }

    const itemRef = itemSnapshot.docs[0].ref;
    const item = itemSnapshot.docs[0].data();
    const data = await itemRef
      .collection('data')
      .get()
      .then((dataSnapshot) => dataSnapshot.docs.map((doc) => doc.data()));

    res.status(200).json({ ...item, data });
  } catch (error) {
    next(error);
  }
};

export const setData: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { itemId, optionId } = req.params;
  const { care, unopened } = req.query;
  const { date, low, mid, high } = req.body;

  try {
    const itemSnapshot = await store
      .collection('item')
      .where('itemId', '==', itemId)
      .where('optionId', '==', optionId)
      .where('care', '==', care)
      .where('unopened', '==', unopened)
      .get();

    if (itemSnapshot.empty) {
      next(new BadRequestException('요청한 정보가 존재하지 않습니다.'));
    }

    const itemRef = itemSnapshot.docs[0].ref;
    const result = await itemRef.collection('data').doc(date).set({
      date,
      low,
      mid,
      high,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
