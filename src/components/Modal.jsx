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
    const [showPass, setShowPass] = useState(false);
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

    const togglePass = () => {
        setShowPass(prevState => !prevState);
    }



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-blue-400 dark:bg-slate-800 px-20 py-10 rounded-md shadow-lg flex flex-col relative">
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
                <div className="relative w-64 mt-5">
                <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-b border-white-300 text-white focus:outline-none"
                />
                <button 
                    type="button" 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                    onClick={togglePass}
                >
                {showPass ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="feather feather-eye">
                    <path d="M1 12s3-9 11-9 11 9 11 9-3 9-11 9-11-9-11-9zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="feather feather-eye-off">
                    <path d="M17 1l6 6M1 1l18 18M14.2 14a3 3 0 1 0 0-4.2m-4.4 0a3 3 0 1 0 0 4.2M12 5c-4 0-7 4-7 4s3 4 7 4 7-4 7-4-3-4-7-4z"></path>
                  </svg>
                )}
              </button>
                </div>
                <input
                    type="text"
                    placeholder="Website"
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                />
                <div className="flex flex-col space-y-3 mt-8">
                    <button
                        className="px-8 py-2 bg-blue-300 dark:bg-slate-600 hover:bg-slate-500 rounded-md text-white cursor-pointer"
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
