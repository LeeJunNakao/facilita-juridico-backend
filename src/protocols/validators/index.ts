import { ValidationError, validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ValidationException } from '@src/exceptions';

type ClassConstructor<T> = { new (...args: any[]): T };

export const validateDto = async <T extends object>(
  Dto: ClassConstructor<T>,
  data: any,
): Promise<T | undefined> => {
  try {
    const element = Object.assign(new Dto() as any, data);

    const parsedElement = plainToInstance(Dto, element, {
      excludeExtraneousValues: true,
    });

    await validateOrReject(parsedElement);

    if (Object.values(parsedElement).every((value) => value === undefined)) {
      return undefined;
    }

    return parsedElement;
  } catch (error) {
    const errors = (error as ValidationError[]).map((e) => {
      return [e.property, Object.values(e.constraints || {})];
    });
    throw new ValidationException(Object.fromEntries(errors));
  }
};
