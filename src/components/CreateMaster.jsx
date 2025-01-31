import React, { useState } from "react";
import { addNewMasterPassword, getUserData, retrieveMasterPassword } from "../config/firebase_api";
import { hashPassword, comparePassword } from "../SecurePass/password";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {useEffect} from 'react';

function createMaster() {
    const navigate = useNavigate();
    const [masterPassword, setMasterPassword] = useState("");
    const [isMaster, setIsMaster] = useState(false);
    const [showPass, setShowPass] = useState(false);

    // Try to retrieve the masterpassword based on the user email
    // If the master password is NOT set, then the user will stay on this page
    // Otherwise, the user will be taken to the dashboard


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
        navigate("/dashboard");
        console.log("Creating Master Password");
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            console.log("Enter key pressed");
            createMaster();
        }
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
        <div className="bg-slate-950 flex flex-col items-center h-screen p-4">
            
          <div className="bg-slate-900 p-8 rounded-md shadow-lg flex flex-col">
            <h1 className="text-white text-sm">
              To continue, please create a Master Password
            </h1>
    
            <div className="relative w-64 mt-2">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Master Password"
                onChange={handleMasterPass}
                onKeyDown={handleEnter}
                className="w-64 px-4 py-2 border-b border-white-300 text-white focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                onClick={togglePass}
              >
                {showPass ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    className="feather feather-eye"
                  >
                    <path d="M1 12s3-9 11-9 11 9 11 9-3 9-11 9-11-9-11-9zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    className="feather feather-eye-off"
                  >
                    <path d="M17 1l6 6M1 1l18 18M14.2 14a3 3 0 1 0 0-4.2m-4.4 0a3 3 0 1 0 0 4.2M12 5c-4 0-7 4-7 4s3 4 7 4 7-4 7-4-3-4-7-4z"></path>
                  </svg>
                )}
              </button>
            </div>
            <div className="flex flex-row mt-2 justify-between">
  <button
    className="bg-slate-700 text-white mt-2 rounded-b rounded-t px-4 py-1 hover:bg-slate-600
      cursor-pointer ml-auto" onClick={createMaster}>
    Submit
  </button>
</div>
          </div>
        </div>
      );
}

export default createMaster;