import { Request, Response } from 'express';
import AmqpService from '../services/amqp-service';

/**
 * POST /email-hook
 * Accepts body in predefiend format, validates it and pass down the queue for other services
 * @param req validated request with values for `to`, `cc`, `bcc`, `subject` and `message`
 * @param res 200 with empty body
 */
export const email = (req: Request, res: Response) => {
  res.status(200).send();

  const values = req.body;

  AmqpService.instance.sendMessage(JSON.stringify(values));
};
