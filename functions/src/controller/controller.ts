import { Request, Response, RequestHandler, NextFunction } from 'express';
import store from '../lib/database/store';
import { NotFoundException } from '../lib/exception/http.exception';
import { sendEmailCollect } from '../lib/slack/slack';
import update from '../lib/coupang/update';
import { convertDate } from '../lib/util/dateUtil';

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
      next(new NotFoundException('요청한 정보가 존재하지 않습니다.'));
    }

    const itemRef = itemSnapshot.docs[0].ref;
    const item = itemSnapshot.docs[0].data();

    const data = await itemRef
      .collection('data')
      .orderBy('date')
      .get()
      .then((dataSnapshot) => dataSnapshot.docs.map((doc) => doc.data()));

    const coupang = await itemRef
      .collection('coupang')
      .orderBy('date')
      .get()
      .then((coupangSnapshot) => coupangSnapshot.docs.map((doc) => doc.data()));

    const time: Date | null = item.time ? convertDate(item.time) : null;

    res.status(200).json({ ...item, data, coupang, time });
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
      next(new NotFoundException('요청한 정보가 존재하지 않습니다.'));
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

export const getEmails: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const snapshot = await store.collection('email').get();
    const emails = snapshot.docs.map((doc) => {
      const { email, date } = doc.data();
      return {
        email,
        date: convertDate(date),
      };
    });

    res.status(200).json(emails);
  } catch (error) {
    next(error);
  }
};

export const addEmail: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.params;

  try {
    const result = await store.collection('email').doc(email).set({
      email,
      date: new Date(),
    });

    sendEmailCollect(email);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCoupang: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await update();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
