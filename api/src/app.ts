import express from 'express';
import 'reflect-metadata';
import createConnection from './database/index';
import router from './routes';

createConnection();
const app = express();

app.use(express.json());
app.use(router);

export default app;
