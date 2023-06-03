import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Request, Response, RequestHandler, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { ValidationException } from '../exception/validation.exception';

export const validateParams = (
  type: ClassConstructor<object>,
  skipMissingProperties = false,
): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    validate(
      plainToInstance(type, req.params, { excludeExtraneousValues: true }),
      {
        skipMissingProperties,
      },
    ).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        next(new ValidationException(errors));
      } else {
        next();
      }
    });
  };
};

export const validateQuery = (
  type: ClassConstructor<object>,
  skipMissingProperties = false,
): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    validate(
      plainToInstance(type, req.query, { excludeExtraneousValues: true }),
      {
        skipMissingProperties,
      },
    ).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        next(new ValidationException(errors));
      } else {
        next();
      }
    });
  };
};

export const validateBody = (
  type: ClassConstructor<object>,
  skipMissingProperties = false,
): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    validate(
      plainToInstance(type, req.body, { excludeExtraneousValues: true }),
      {
        skipMissingProperties,
      },
    ).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        next(new ValidationException(errors));
      } else {
        next();
      }
    });
  };
};
