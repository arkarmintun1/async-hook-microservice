import { Email } from '../src/entity/email';
import EmailService from '../src/services/email-service';

describe('email', () => {
  test('should not send email for invalid values', async () => {
    const email = new Email();
    await expect(EmailService.sendEmail(email)).rejects.toThrow();
  });

  test('should send email for valid values', async () => {
    const email = new Email();
    email.to = 'test@test.com';
    email.cc = ['test@email.com'];
    email.bcc = ['test@email.com'];
    email.subject = 'This is email subject';
    email.message = 'This is email message';
    await expect(EmailService.sendEmail(email)).resolves.not.toThrow();
  });
});
