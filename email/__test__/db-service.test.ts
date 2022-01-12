import DbService from '../src/services/db-service';

describe('database', () => {
  let database: DbService;

  beforeAll(() => {
    database = DbService.instance;
  });

  afterAll(() => {
    database.connection.close();
  });

  test('should connect to db successfully', async () => {
    await expect(database.init()).resolves.not.toThrow();
  });

  test('save email fail with incorrect data', async () => {
    await expect(database.saveEmail('')).rejects.toThrow();
  });

  test('save email successful with correct data', async () => {
    await expect(
      database.saveEmail({
        to: 'test@test.com',
        cc: ['test@email.com'],
        bcc: ['test@email.com'],
        subject: 'This is email subject',
        message: 'This is email message',
      })
    ).resolves.not.toThrow();
  });
});
