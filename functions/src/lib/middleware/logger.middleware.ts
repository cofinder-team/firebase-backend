import { Request, Response, RequestHandler, NextFunction } from 'express';
import * as logger from 'firebase-functions/logger';

export const loggerMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startAt = process.hrtime();
  const { method, originalUrl } = req;

  const ip = req.headers['x-forwarded-for'] || '';
  const userAgent = req.get('user-agent') || '';

  res.on('close', () => {
    const { statusCode } = res;
    const contentLength = res.get('content-length') || 0;
    const diff = process.hrtime(startAt);
    const responseTime = Math.round(diff[0] * 1e6 + diff[1] * 1e-3) / 1e3;

    logger.log(
      `${method} ${originalUrl} [${statusCode}, ${responseTime}ms, ${contentLength}byte] - ${ip} ${userAgent}`,
    );
  });

  next();
};
