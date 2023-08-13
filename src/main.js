import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "../src/assets/style.scss";
import store from "./store";

createApp(App).use(router).use(store).mount("#app");

import { initializeApp } from "firebase/app";

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
