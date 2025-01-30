import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import {addNewEntry} from '../config/handlePassword';
import { encryptPass, decryptPass } from '../SecurePass/encrypt';
import { UpdateContext } from '../Hooks/UseContext';
function Modal({ closeModal }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [website, setWebsite] = useState("");

    const {refresh, setRefresh} = useContext(UpdateContext);


    // On the click, we add a new entry to the database
    // We ALSO need to 
    const handleClick = () => {
        console.log("Clicked!");
        // Save everything and push to the database
        // Call encryptPass function to encrypt the password
        const [encryptedPass, key, encrypt] = encryptPass(password);
        const user = getAuth().currentUser;
        addNewEntry(name, email, encryptedPass, website, key, user.email);

        console.log("Added new entry!");
        setRefresh(!refresh);
        closeModal(false);
    }



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-slate-800 px-20 py-10 rounded-md shadow-lg flex flex-col relative">
                <h1 className="text-white text-2xl font-bold">New Entry</h1>
                <button
                    className="absolute top-2 right-2 text-white text-2xl cursor-pointer rounded-full p-2"
                    onClick={() => closeModal(false)}
                >
                    X
                </button>
                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                />
                <input
                    type="text"
                    placeholder="Email/Username"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                />
                <input
                    type="text"
                    placeholder="Website"
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                />
                <div className="flex flex-col space-y-3 mt-8">
                    <button
                        className="px-8 py-2 bg-slate-600 hover:bg-slate-500 rounded-md text-white cursor-pointer"
                        onClick={handleClick}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
