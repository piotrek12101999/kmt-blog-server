export class CustomError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage);
  }
}
