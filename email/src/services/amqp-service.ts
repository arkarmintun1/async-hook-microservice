import { connect, Connection, Channel } from 'amqplib/callback_api';

export default class AmqpService {
  private static _instance?: AmqpService;
  private _hostUrl = 'amqp://rabbitmq';
  public connection!: Connection;
  public channel!: Channel;

  public static queues = {
    email: 'email',
  };

  private constructor() {
    if (AmqpService._instance)
      throw new Error('Use AmqpService.instance instead of new.');
    AmqpService._instance = this;
  }

  static get instance() {
    return AmqpService._instance ?? (AmqpService._instance = new AmqpService());
  }

  public init() {
    return new Promise<void>((resolve, reject) => {
      connect(this._hostUrl, (error, connection: Connection) => {
        if (error) {
          reject(error);
        }

        this.connection = connection;

        connection.createChannel((err, channel: Channel) => {
          if (err) {
            reject(err);
          }

          this.channel = channel;

          console.log('rabbitmq connected!');

          resolve();
        });
      });
    });
  }

  /**
   * Set queue message manually, orignally set to docket host name
   * @param hostUrl rabbitmq host url
   */
  public setHostUrl(hostUrl: string) {
    this._hostUrl = hostUrl;
  }

  /**
   * Send message along the message queue for other services
   * @param message message string to queue
   */
  public sendMessage(message: string) {
    this.channel.sendToQueue(AmqpService.queues.email, Buffer.from(message));
  }
}
