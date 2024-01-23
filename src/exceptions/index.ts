export class HttpException extends Error {
  constructor(
    public code: number,
    public message: string,
  ) {
    super(message);
  }
}

type ValidationError = {
  [key: string]: string[];
};

export class ValidationException extends Error {
  public message: string;
  constructor(public errors: ValidationError) {
    super('Invalid fields');
    this.message = 'Invalid fields';
  }
}
