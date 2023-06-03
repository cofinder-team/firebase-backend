import * as functions from 'firebase-functions';
import app from './app';
import router from './controller';

app.use('/', router);

const region = 'asia-northeast3';
export const api = functions.region(region).https.onRequest(app);
