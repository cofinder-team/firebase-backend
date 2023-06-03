import * as admin from 'firebase-admin';

admin.initializeApp();
const store = admin.firestore();

export default store;
