import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request....');
    next();
  }
}

/* si upuò anche definire una funzione singola da poi passare al metodo apply del modulo app
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request...');
  next();
}
*/
