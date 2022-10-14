import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMpgbQLcsLyCzwb1PWJNnOJPpXEGNVIV4",
  authDomain: "contactlist-a93aa.firebaseapp.com",
  projectId: "contactlist-a93aa",
  storageBucket: "contactlist-a93aa.appspot.com",
  messagingSenderId: "856159325926",
  appId: "1:856159325926:web:ec7e8efb22f6c226787527",
  measurementId: "G-HH1VXM280M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
