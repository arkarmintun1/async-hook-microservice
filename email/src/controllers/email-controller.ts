import { Request, Response } from 'express';
import DbService from '../services/db-service';

/**
 * GET /emails
 * retrieve all the emails that have been passed through message queue
 * @param req
 * @param res 200 with the list of emails
 */
export const emails = async (req: Request, res: Response) => {
  const { count, emails } = await DbService.instance.getAllEmails();
  res.json({ total: count, emails: emails });
};
