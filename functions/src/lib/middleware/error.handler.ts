import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
} from '../exception/http.exception';
import { ValidationException } from '../exception/validation.exception';

const convertToHttpException = (exception: Error): HttpException => {
  switch (true) {
    case exception instanceof HttpException:
      return exception as HttpException;
    case exception instanceof ValidationException:
      return new BadRequestException('잘못된 형식의 요청입니다.');
    default:
      return new InternalServerErrorException('서버 오류가 발생했습니다.');
  }
};

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(err);
  const exception = convertToHttpException(err);
  res.status(exception.code);
  return res.json(HttpException.parse(exception));
};
