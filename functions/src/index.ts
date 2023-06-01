import * as functions from 'firebase-functions';
import express, { Request, Response } from 'express';
import * as admin from 'firebase-admin';

admin.initializeApp();
const store = admin.firestore();

const app = express();

app.get('/', async (request: Request, response: Response) => {
  const testRef = store.collection('test');
  testRef.add({
    createdAt: new Date(),
  });
  const data = await testRef
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    );
  response.send(data);
});

export const api = functions.https.onRequest(app);
