import nodemailer from 'nodemailer';
import appconfig from '../configs/appconfig';
import { Email } from '../entity/email';

var mailSender = nodemailer.createTransport({
  host: appconfig.mailHost,
  port: Number(appconfig.mailPort),
  auth: {
    user: appconfig.mailUser,
    pass: appconfig.mailPass,
  },
});

export default class EmailService {
  public static async sendEmail(email: Email) {
    return mailSender.sendMail({
      from: appconfig.mailFrom,
      to: email.to,
      cc: email.cc,
      bcc: email.bcc,
      subject: email.subject,
      text: email.message,
    });
  }
}
