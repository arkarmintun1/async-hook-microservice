import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import * as EmailController from './controllers/email-controller';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/emails', EmailController.emails);

export default app;
