import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBa4m3ywSQR7ouz1PJc0HFZWGWNa0656Tw',
  authDomain: 'la-voix-cc6c6.firebaseapp.com',
  projectId: 'la-voix-cc6c6',
  storageBucket: 'la-voix-cc6c6.appspot.com',
  messagingSenderId: '176952474505',
  appId: '1:176952474505:web:46f29be9341334a492bf58',
};

// Below variable connects firebase services to your app.
const myApp: FirebaseApp = initializeApp(firebaseConfig);

export const database = getFirestore(myApp);
