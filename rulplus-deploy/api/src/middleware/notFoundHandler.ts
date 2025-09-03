import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Маршрут ${req.originalUrl} не найден на этом сервере`,
    code: 'ROUTE_NOT_FOUND',
  });
}; 