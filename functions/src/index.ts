import * as functions from 'firebase-functions';
import express, { Request, Response } from 'express';

const app = express();

app.get('/hello', (request: Request, response: Response) => {
  response.send('Hello from Express on Firebase!');
});

export const api = functions.https.onRequest(app);
