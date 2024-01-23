import { ValidationException } from '@src/exceptions';
import { Response } from 'express';

export const exceptionControllerHandler = (
  res: Response,
  error: any,
  defaultError: { status: number; message: string },
) => {
  if (error instanceof ValidationException) {
    return res
      .status(400)
      .send({ message: error.message, errors: error.errors });
  }

  res.status(defaultError.status).send({ message: defaultError.message });
};
