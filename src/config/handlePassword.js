// This contains all of the API calls to handle the passwords database
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, deleteDoc, updateDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";


export const addNewEntry = async (name, email, password, website_name, key) => {
    try {
        const ref = await setDoc(doc(db, "Passwords", name), {
            Name: name, 
            Email: email, 
            Password: password, 
            Website: website_name,
            Favorite: false, 
            Key: key
        });
        console.log("New entry added successfully!");
    } catch (error) {
        console.error("Error adding new entry: ", error);
    }
}

export const retrieveAllEntries = async () => {
    try {
        const res = []
        const querySnapshot = await getDocs(collection(db, "Passwords"));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data().Name);
            res.push(doc.data().Name);
        }
        );
        return res;
    } catch (error) {
        console.error("Error retrieving all entries: ", error);
    }
}

export const deleteEntry = async (name) => {
    try {
        await deleteDoc(doc(db, "Passwords", name));
        console.log("Entry deleted successfully!");
    } catch (error) {    
        console.error("Error deleting entry: ", error);
    }
}

export const updateFavorite = async (name, fav_bool) => {
    try {
        const ref = await updateDoc(doc(db, "Passwords", name), {
            Favorite: fav_bool
        });
        console.log("Entry marked as favorite!");
    } catch (error) {
        console.error("Error marking entry as favorite: ", error);
    }
}

export const updateEntry = async (name, email, password, website_name, favorite) => {
    try {
        const ref = await updateDoc(doc(db, "Passwords", name), {
            Name: name, 
            Email: email, 
            Password: password, 
            Website: website_name,
            Favorite: favorite
        });
        console.log("Entry updated successfully!");
    } catch (error) {
        console.error("Error updating entry: ", error);
    }
}

export const retrieveEntry = async (name) => {
    try {
        const querySnapshot = await getDoc(doc(db, "Passwords", name));
        console.log("Entry: ", querySnapshot.data());
        return querySnapshot.data();
    } catch (error) {
        console.error("Error retrieving entry: ", error);
    }
}