// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDptDTHnVu8FXxFV-PHienHzgBMhxAiIPY",
  authDomain: "hotel-ec35e.firebaseapp.com",
  projectId: "hotel-ec35e",
  storageBucket: "hotel-ec35e.appspot.com",
  messagingSenderId: "1062889526541",
  appId: "1:1062889526541:web:1e49bf04da50d6322a0c44"
};
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  const auth = app.auth();
  const db = app.firestore();
  const storageRef = app.storage().ref();

  // collections
  const userCollection = db.collection("users");
  const adminCollection = db.collection("admins");
  const roomsCollection = db.collection("rooms");