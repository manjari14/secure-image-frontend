import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlLM1vrD5Y5FT6Xg4ez7-KIPPTzK41l1Q",
  authDomain: "image-40d30.firebaseapp.com",
  databaseURL: "https://image-40d30-default-rtdb.firebaseio.com",
  projectId: "image-40d30",
  storageBucket: "image-40d30.appspot.com",
  messagingSenderId: "153877846278",
  appId: "1:153877846278:web:feccd4417a5c26c6a56687",
  measurementId: "G-25RHVDWJQR",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);

// Function to Upload Image to Firebase Storage
export const uploadImageToFirebase = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file provided"));
      return;
    }

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Track upload progress
        console.log(
          `Upload Progress: ${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}%`
        );
      },
      (error) => reject(error),
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};
