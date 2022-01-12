import AmqpService from './services/amqp-service';

/**
 * Initialize the services (e.g. RabbitMQ)
 */
export const init = async () => {
  try {
    await AmqpService.instance.init();

    AmqpService.instance.channel.assertQueue(AmqpService.queues.email);

    process.on('beforeExit', () => {
      AmqpService.instance.connection.close();
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
