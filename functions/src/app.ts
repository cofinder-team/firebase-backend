import express from 'express';
import { errorHandler } from './lib/middleware/error.handler';
import router from './controller';
import { loggerMiddleware } from './lib/middleware/logger.middleware';
import cors from 'cors';

const app = express();
app.use(cors({ origin: true }));
app.use(loggerMiddleware);
app.use('/', router);
app.use(errorHandler);

export default app;
