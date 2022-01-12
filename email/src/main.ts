import app from './app';
import { init } from './init';
import AmqpService from './services/amqp-service';
import DbService from './services/db-service';
import EmailService from './services/email-service';

init().then(() => {
  AmqpService.instance.channel.consume(AmqpService.queues.email, (msg) => {
    if (msg !== null) {
      try {
        const payload = JSON.parse(msg.content.toString());

        DbService.instance.saveEmail(payload);

        EmailService.sendEmail(payload).then((result) => {
          console.log('email', result);
        });

        AmqpService.instance.channel.ack(msg);
      } catch (err) {
        console.log(err);
      }
    }
  });
});

app.listen(3001, () => {
  console.log('app listening on port 3001');
});
