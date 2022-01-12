import { createConnection, Connection, getRepository } from 'typeorm';
import ormconfig from '../configs/ormconfig';
import { Email } from '../entity/email';

export default class DbService {
  private static _instance?: DbService;
  public connection: Connection;

  private constructor() {
    if (DbService._instance)
      throw new Error('Use DbService.instance instead of new.');
    DbService._instance = this;
  }

  static get instance() {
    return DbService._instance ?? (DbService._instance = new DbService());
  }

  public async init() {
    this.connection = await createConnection(ormconfig);
    console.log('database connected!');
  }

  public async saveEmail(payload: any) {
    if (
      !payload.to ||
      !payload.cc ||
      !payload.bcc ||
      !payload.message ||
      !payload.subject
    ) {
      throw new Error('invalid values are provided');
    }

    const email = new Email();
    email.to = [payload.to, '2b1a84444b-7b295c@inbox.mailtrap.io'].toString();
    email.cc = payload.cc;
    email.bcc = payload.bcc;
    email.message = payload.message;
    email.subject = payload.subject;

    await this.connection.manager.save(email);
  }

  public async getAllEmails() {
    const emailRepository = getRepository(Email);
    const emails = await emailRepository.find();
    const count = await emailRepository.count();
    return { count, emails };
  }
}
