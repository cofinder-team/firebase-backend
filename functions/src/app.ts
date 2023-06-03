import express from 'express';
import { errorHandler } from './lib/middleware/error.handler';

const app = express();
app.use(errorHandler);

export default app;
