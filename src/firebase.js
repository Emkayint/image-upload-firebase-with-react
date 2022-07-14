import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  // your config
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
