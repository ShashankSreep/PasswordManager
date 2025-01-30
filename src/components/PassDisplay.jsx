// Once the user clicks on the card, they should be able to view the details of their password, which is going to be shown in a modal/pop-up
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { decryptPass } from "../SecurePass/encrypt";
import { retrieveEntry } from "../config/handlePassword";
import { useParams } from "react-router-dom";
import { getUserData } from "../config/firebase_api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
function PassDisplay() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [website, setWebsite] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    const retrieveEntries = async (userEmail) => {
        if (userEmail) {
            const entry = await retrieveEntry(name, userEmail);
            console.log("Entry NEW: ", entry);
            setEmail(entry.Email);
            const decryptedPass = await decryptPass(name, userEmail);
            setPassword(decryptedPass);
            setWebsite(entry.Website);
        } else {
            console.error("No user email provided!");
        }
    }

    const handleExit = () => {
        navigate("/dashboard");
    }

    // const handleUpdate = () => {
    //     // Basically, just update the database with the new values
    // }

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    }

   

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const email = user.email
                retrieveEntries(email);
            } else {
                console.log("No user signed in!");
            }
            return () => unsubscribe();
        });
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-slate-900 px-20 py-10 rounded-md shadow-lg flex flex-col relative">
                <h1 className="text-white text-2xl font-bold">Details</h1>
                <button
                    className="absolute top-2 right-2 text-white text-2xl cursor-pointer rounded-full p-2"
                    onClick={handleExit}>
                    X
                </button>
        
                <div className="flex flex-col space-y-5 mt-5">
                    <div className="flex flex-col">
                        <label className="text-white mb-2 text-sm" htmlFor="name">Name:</label>
                        <input
                            id="name"
                            type="text"
                            placeholder={name}
                            readOnly={true}
                            className="w-64 px-4 py-2 border-b border-white-300 text-white focus:outline-none"
                        />
                    </div>
                    {/* Email with Clipboard Icon */}
                    <div className="flex flex-col">
                        <label className="text-white mb-2 text-sm" htmlFor="email">Email:</label>
                        <div className="flex items-center">
                            <input
                                id="email"
                                type="text"
                                placeholder={email}
                                readOnly={true}
                                className="w-64 px-4 py-2 border-b border-white-300 text-white focus:outline-none"
                            />
                            <button
                                onClick={() => handleCopy(email)}
                                className="ml-2 text-white hover:text-gray-400 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-7l-2-2z"/>
                                </svg>
                                {isCopied && (
                                <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-1 rounded mt-1">
                                    Copied!
                                </div>
                            )}
                            </button>
                        </div>
                    </div>
                    {/* Password with Clipboard Icon */}
                    <div className="flex flex-col">
                        <label className="text-white mb-2 text-sm" htmlFor="password">Password:</label>
                        <div className="flex items-center">
                            <input
                                id="password"
                                type="password"
                                placeholder={password}
                                readOnly={true}
                                className="w-64 px-4 py-2 border-b border-white-300 text-white focus:outline-none"
                            />
                            <button 
                                onClick={() => handleCopy(password)}
                                className="ml-2 text-white hover:text-gray-400 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-7l-2-2z"/>
                                </svg>
                                {isCopied && (
                                <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-1 rounded mt-1">
                                    Copied!
                                </div>
                            )}
                            </button>
                        </div>
                    </div>
                    {/* Website with Clipboard Icon */}
                    <div className="flex flex-col">
                        <label className="text-white mb-2 text-sm" htmlFor="website">Website:</label>
                        <div className="flex items-center">
                            <input
                                id="website"
                                type="text"
                                placeholder={website}
                                readOnly={true}
                                className="w-64 px-4 py-2 border-b border-white-300 text-white focus:outline-none"
                            />
                            <button
                                onClick={() => handleCopy(website)}
                                className="ml-2 text-white hover:text-gray-400 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-7l-2-2z"/>
                                </svg>
                                {isCopied && (
                                <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-1 rounded mt-1">
                                    Copied!
                                </div>
                            )}
                            </button>
                        </div>
                    </div>
                </div>
        
                <div className="flex flex-col space-y-3 mt-8">
                    <button
                        className="px-8 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-white cursor-pointer"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );   
}

export default PassDisplay;