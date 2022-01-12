import { ConnectionOptions } from 'typeorm';
import config from './appconfig';
import { Email } from '../entity/email';

export default {
  type: 'mongodb',
  host: 'mongo',
  username: config.mongoUsername,
  password: config.mongoPassword,
  database: config.mongoDatabase,
  entities: [Email],
  synchronize: true,
  logging: false,
  authSource: 'admin',
} as ConnectionOptions;
