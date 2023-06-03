import express from 'express';
import { errorHandler } from './lib/middleware/error.handler';
import router from './controller';

const app = express();
app.use('/', router);
app.use(errorHandler);

export default app;
