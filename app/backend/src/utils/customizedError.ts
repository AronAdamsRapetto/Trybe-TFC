export default class CustomizedError extends Error {
  private _statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this._statusCode = statusCode;
  }

  get statusCode() { return this._statusCode; }
}
