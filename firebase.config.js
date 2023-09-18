import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPjRk96nLcye1xHsArbS7lYTX3ZfukRag",
  authDomain: "clothingadvisor-2244c.firebaseapp.com",
  projectId: "clothingadvisor-2244c",
  storageBucket: "clothingadvisor-2244c.appspot.com",
  messagingSenderId: "897721836320",
  appId: "1:897721836320:web:8b72f9783633b3f89ced45",
  measurementId: "G-HS11KHF4WF"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);



const db = getFirestore(app);
const storage = getStorage(app);



export {db,storage};