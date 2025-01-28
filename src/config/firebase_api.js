// Functions, which we will call in our components => Basically API to interact with Firebase
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const addNewMasterPassword = async (masterPassword) =>  {
    try {
        const ref = await setDoc(doc(db, "MasterPassword", "MP"), {
            masterPassword: masterPassword
        });
    } catch (error) {
        console.error("Error adding new master password: ", error);
    }
}

export const retrieveMasterPassword = async () => {
    try {
        const querySnapshot = await getDoc(doc(db, "MasterPassword", "MP"));
        console.log("Master Password: ", querySnapshot.data().masterPassword);
        return querySnapshot.data().masterPassword;
    } catch (error) {
        console.error("Error retrieving master password: ", error);
    }
}

export const deleteMasterPassword = async () => {
    try {
        await deleteDoc(doc(db, "MasterPassword", "MP"));
        console.log("Master Password deleted successfully!");
    } catch (error) {
        console.error("Error deleting master password: ", error);
    }
}

export const updateMasterPassword = async (newMasterPassword) => {
    try {
        const ref = await updateDoc(doc(db, "MasterPassword", "MP"), {
            masterPassword: newMasterPassword
        })
        console.log("Master Password updated successfully!");
    } catch (error) {
        console.error("Error updating master password: ", error);
    }
}