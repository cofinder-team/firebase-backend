import { Request, Response, RequestHandler, NextFunction } from 'express';
import store from '../lib/store';

export const doTest: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const testRef = store.collection('test');
    testRef.add({
      createdAt: new Date(),
    });
    const data = await testRef
      .get()
      .then((snapshot) =>
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};
