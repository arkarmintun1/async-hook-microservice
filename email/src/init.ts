import AmqpService from './services/amqp-service';
import DbService from './services/db-service';

export const init = async () => {
  try {
    await DbService.instance.init();

    await AmqpService.instance.init();

    AmqpService.instance.channel.assertQueue(AmqpService.queues.email);

    process.on('beforeExit', () => {
      AmqpService.instance.connection.close();
      DbService.instance.connection.close();
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
