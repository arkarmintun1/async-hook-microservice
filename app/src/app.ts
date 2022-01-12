import express from 'express';
import cors from 'cors';
import * as emailController from './controllers/email-controller';
import * as emailValidator from './validators/email-validator';
import { validate } from './validators/validator-handler';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/email-hook', validate(emailValidator.email), emailController.email);

export default app;
