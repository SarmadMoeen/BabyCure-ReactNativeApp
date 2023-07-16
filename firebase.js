/*// Import the functions you need from the SDKs you need/
import { initializeApp } from 'firebase/app';
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
//import { getAuth, createUserWithEmailAndPassword , connectAuthEmulator} from "firebase/auth";
import { View } from 'react-native-web';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfWr7DpEYWl1eLaoq27UPxb9A80WTyGO0",
  authDomain: "gifted-chat-601fc.firebaseapp.com",
  projectId: "gifted-chat-601fc",
  storageBucket: "gifted-chat-601fc.appspot.com",
  messagingSenderId: "112363243060",
  appId: "1:112363243060:web:94130b191280d78164ec61"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(); 


const colRef = collection(db,'students');
let students = [];
getDocs(colRef)
.then((snapshot)=>{
  //console.log(snapshot.docs);

  snapshot.docs.forEach((doc)=>{
      students.push({ ...doc.data(), id: doc.id})
  }) 
  console.log(students)
})

.catch(err=>{
  console.log(err.message);
})


export{auth, db, app, students};
// Get a list of cities from your database*/
