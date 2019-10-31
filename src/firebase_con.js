import * as firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyB-iCqKYtdjfdjGXeEp1hLihNkDHhSVlWo',
  authDomain: 'soakupsyllogisms.firebaseapp.com',
  databaseURL: 'https://soakupsyllogisms.firebaseio.com',
  projectId: 'soakupsyllogisms',
  storageBucket: 'soakupsyllogisms.appspot.com',
  messagingSenderId: '543427295946',
  appId: '1:543427295946:web:e8015cb55d1bdec1301233',
  measurementId: 'G-4ZGCK9SZRK',
});
//firebase.analytics();

export default app;
