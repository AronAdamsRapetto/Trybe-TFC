import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (error, req, res, _next) => {
  if (error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  return res.status(500).json({ message: 'Internal error!' });
};

export default errorMiddleware;
