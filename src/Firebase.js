import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyBWGX6ohkF5DjKYDs3Wr02FmrVMHXttJl0",
  authDomain: "netflix-clone-c8548.firebaseapp.com",
  projectId: "netflix-clone-c8548",
  storageBucket: "netflix-clone-c8548.appspot.com",
  messagingSenderId: "1083223450056",
  appId: "1:1083223450056:web:2714c3cb14da61959260fd"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signup = async(name, email, password)=>{
  try{
   const res = await createUserWithEmailAndPassword(auth, email,password);
   const user = res.user;
   await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider:"local",
      email,
   });
  }catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}
const login = async(email, password) =>{
  try{
     await  signInWithEmailAndPassword(auth, email, password);
  }catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
  }

}
const logout = () =>{
    signOut(auth);
}
export {auth, db, signup, login, logout};