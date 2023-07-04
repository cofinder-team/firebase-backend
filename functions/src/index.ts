import * as functions from 'firebase-functions';
import app from './app';
import update from './lib/coupang/update';

const region = 'asia-northeast3';
export const api = functions
  .region(region)
  .runWith({ timeoutSeconds: 540 })
  .https.onRequest(app);

export const coupang = functions
  .region(region)
  .runWith({ timeoutSeconds: 540 })
  .pubsub.schedule('0 * * * *')
  .onRun(() => update());
