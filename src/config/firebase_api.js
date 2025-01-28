// Functions, which we will call in our components => Basically API to interact with Firebase
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const addNewMasterPassword = async (masterPassword) =>  {
    try {
        const ref = await addDoc(doc(db, "MasterPassword"), {
            masterPassword: masterPassword
        });
    } catch (error) {
        console.error("Error adding new master password: ", error);
    }
}

const retrieveMasterPassword = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "MasterPassword"));
        console.log("Master Password: ", querySnapshot.docs[0].data().masterPassword);
    } catch (error) {
        console.error("Error retrieving master password: ", error);
    }
}

// const deleteMasterPassword = async () => {
//     try {
//         const ref = await 
//     }
// }

const updateMasterPassword = async (newMasterPassword) => {
    try {
        const ref = await updateDoc(doc(db, "MasterPassword"), {
            masterPassword: newMasterPassword
        })
    } catch (error) {
        console.error("Error updating master password: ", error);
    }
}