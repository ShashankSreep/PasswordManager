import React, { useState } from "react";
import { addNewMasterPassword, getUserData } from "../config/firebase_api";
import { hashPassword, comparePassword } from "../SecurePass/password";
import { useNavigate } from "react-router-dom";

function createMaster() {
    const navigate = useNavigate();
    const [masterPassword, setMasterPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const handleMasterPass = (e) => {
        setMasterPassword(e.target.value);
    }

    const togglePass = () => {
        setShowPass(prevState => !prevState)
    }

    const createMaster = async () => {
        const user = await getUserData();
        const hashedPass = await hashPassword(masterPassword);
        console.log(masterPassword);
        addNewMasterPassword(hashedPass, user.email);
        setMasterPassword("");
        navigate("/masterpass");
        
        console.log("Creating Master Password");
    }

    // const passwordStrength = () => {
    //     if (masterPassword.length < 12 || 
    //         !masterPassword.match(/[a-z]/) ||
    //         !masterPassword.match(/[A-Z]/) ||
    //         !masterPassword.match(/[0-9]/) ||
    //         !masterPassword.match(/[^a-zA-Z\d]/)) {
    //             return
    //         }
    // }

    return (
        <div className="bg-slate-950 flex flex-col items-center justify-center h-screen p-4">
            <div className="bg-slate-900 p-18 rounded-md shadow-lg flex flex-col">
                <h1 className="text-white">Create your Master Password: Used to Access your dashboard!</h1>

                <div className="relative w-64 mt-5">
                <input
                    type={showPass ? "text" : "password"}
                    onChange={handleMasterPass}
                    placeholder="Master Password"
                    className="w-full px-4 py-2 border-b border-white-300 text-white focus:outline-none"
                />
                <button 
                    type="button"
                    onClick={togglePass}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
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
                <button className="absolute px-8 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-white cursor-pointer ml-3 mt-2" onClick={createMaster}>Create</button>
                </div>
            </div>
        </div>
    );
}

export default createMaster;