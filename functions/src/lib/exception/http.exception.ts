export class HttpException extends Error {
  name: string;
  code: number;

  constructor(code: number, name: string, message: string | object) {
    super(JSON.stringify(message));
    this.code = code;
    this.name = name;
  }

  static parse(error: HttpException) {
    return {
      code: error.code,
      name: error.name,
      message: JSON.parse(error.message),
    };
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string | object) {
    super(400, 'Bad Request', message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string | object) {
    super(404, 'Not Found', message);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string | object) {
    super(500, 'Internal Server Error', message);
  }
}
