// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCff7SgXefgzlqUSUYemSe7pC-o7kUv0gs",
  authDomain: "gourmet-eats.firebaseapp.com",
  projectId: "gourmet-eats",
  storageBucket: "gourmet-eats.appspot.com",
  messagingSenderId: "345610127509",
  appId: "1:345610127509:web:7c3f2261843516fd71739c",
  measurementId: "G-2N69BBP627"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage=getStorage()

function uploadImage(image,filePath) {
    const storageRef=ref(storage,`images/${filePath}`)
    return uploadBytes(storageRef,image)
    .then((snapShot)=>getDownloadURL(snapShot.ref))
}


export default {
    firebaseApp,
    uploadImage
};