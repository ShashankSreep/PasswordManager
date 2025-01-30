// This contains all of the API calls to handle the passwords database
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, deleteDoc, updateDoc, getDoc, getDocs, collection, where } from "firebase/firestore";
import { db } from "./firebase";


// FIX ALL OF THE BELOW FUNCTIONS to retrieve by USER EMAIL => THUS, user vies only their passwords
export const addNewEntry = async (name, email, password, website_name, key, userEmail) => {
    try {
        const ref = await setDoc(doc(db, "Passwords", userEmail, "Websites", name), {
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

export const retrieveAllEntries = async (userEmail) => {
    try {
        const res = []
        // Get the collection of all the entries with the user's email
        const querySnapshot = await getDocs(collection(db, "Passwords", userEmail, "Websites"));
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

// TODO: Fix this later
export const deleteEntry = async (name, userEmail) => {
    try {
        await deleteDoc(doc(db, "Passwords", name));
        console.log("Entry deleted successfully!");
    } catch (error) {    
        console.error("Error deleting entry: ", error);
    }
}

// TODO: Fix this later
export const updateFavorite = async (name, fav_bool, userEmail) => {
    try {
        const ref = await updateDoc(doc(db, "Passwords", name), {
            Favorite: fav_bool
        });
        console.log("Entry marked as favorite!");
    } catch (error) {
        console.error("Error marking entry as favorite: ", error);
    }
}

// TODO: Fix this later
export const updateEntry = async (name, email, password, website_name, favorite, userEmail) => {
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

// Retrieve a single entry
// 1) Filter by email
// 2) Then, get the entry with the name
export const retrieveEntry = async (name, userEmail) => {
    try {
        const querySnapshot = await getDoc(doc(db, "Passwords", userEmail, "Websites", name));
        console.log("Entry: ", querySnapshot.data());
        return querySnapshot.data();
    } catch (error) {
        console.error("Error retrieving entry: ", error);
    }
}