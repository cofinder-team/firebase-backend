import express from 'express';
import { errorHandler } from './lib/middleware/error.handler';
import router from './controller';
import { loggerMiddleware } from './lib/middleware/logger.middleware';

const app = express();
app.use(loggerMiddleware);
app.use('/', router);
app.use(errorHandler);

export default app;
