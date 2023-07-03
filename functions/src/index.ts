import * as functions from 'firebase-functions';
import app from './app';

const region = 'asia-northeast3';
export const api = functions
  .region(region)
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest(app);
