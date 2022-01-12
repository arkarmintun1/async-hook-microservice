import AmqpService from '../src/services/amqp-service';

describe('rabbitmq', () => {
  let messageQueue: AmqpService;

  beforeAll(() => {
    messageQueue = AmqpService.instance;
  });

  afterAll(() => {
    messageQueue.connection.close();
  });

  test('should connect to rabbitmq successfully', async () => {
    await messageQueue.init();
    expect(messageQueue).not.toBeNull();
    expect(messageQueue.channel).not.toBeNull();
    expect(messageQueue.connection).not.toBeNull();
  });
});
