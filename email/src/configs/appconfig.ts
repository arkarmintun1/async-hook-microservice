const appconfig = {
  mongoDatabase: process.env.MONGO_DATABASE,
  mongoHostname: process.env.MONGO_HOSTNAME,
  mongoUsername: process.env.MONGO_USERNAME,
  mongoPassword: process.env.MONGO_PASSWORD,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS,
  mailFrom: process.env.MAIL_FROM,
};

Object.entries(appconfig).forEach(([key, value]) => {
  if (!value) {
    console.log(`${key} need to be provided in .env!`);
    process.exit(1);
  }
});

export default appconfig;
