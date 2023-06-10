import express from 'express';
import { errorHandler } from './lib/middleware/error.handler';
import router from './controller';
import { loggerMiddleware } from './lib/middleware/logger.middleware';
import * as functions from 'firebase-functions';
import cors from 'cors';

const config = functions.config();
const origin = config.cors.origin;

const app = express();
app.use(cors({ methods: ['GET', 'POST'], origin }));
app.use(loggerMiddleware);
app.use('/', router);
app.use(errorHandler);

export default app;
