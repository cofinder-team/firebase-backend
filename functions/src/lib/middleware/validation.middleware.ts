import { ClassConstructor, plainToClass } from 'class-transformer';
import { Request, Response, RequestHandler, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { ValidationException } from '../exception/validation.exception';

export const validateParams = (
  type: ClassConstructor<object>,
  skipMissingProperties = false,
): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    validate(
      plainToClass(type, req.params, { excludeExtraneousValues: true }),
      {
        skipMissingProperties,
      },
    ).then((errors: ValidationError[]) => {
      Object.entries(
        plainToClass(type, req.params, {
          excludeExtraneousValues: true,
        }),
      ).forEach(([k, v]) => (req.params[k] = v));
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
    validate(plainToClass(type, req.query, { excludeExtraneousValues: true }), {
      skipMissingProperties,
    }).then((errors: ValidationError[]) => {
      Object.entries(
        plainToClass(type, req.query, {
          excludeExtraneousValues: true,
        }),
      ).forEach(([k, v]) => (req.query[k] = v));
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
    validate(plainToClass(type, req.body, { excludeExtraneousValues: true }), {
      skipMissingProperties,
    }).then((errors: ValidationError[]) => {
      req.body = plainToClass(type, req.body, {
        excludeExtraneousValues: true,
      });
      if (errors.length > 0) {
        next(new ValidationException(errors));
      } else {
        next();
      }
    });
  };
};
