// This page is going to require the user to basically enter their master-password, before they can proceed to the dashboard


// First, prompt the user to enter their Master-password
// If they do not already have a master-password created, they can create a master-password
// The masterpassword will follow some very strict guidelines (search for them)
// Once the user enters their master-password, store in the database
// However, the password must be salted and hashed (1 - way encryption)
// If the user decides to reset the password, => Implement this later
import {useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { hashPassword, comparePassword } from '../SecurePass/password';
import { compare } from 'bcryptjs';
function MasterPassword () {
    const [showPass, setShowPass] = useState(false);
    const [masterPassword, setMasterPassword] = useState("");
    const navigate = useNavigate();
    const togglePass = () => {
        setShowPass(prevState => !prevState)
    }

    const handleEnter = (e) => {
        if (e.key == "Enter") {
            console.log("Enter key pressed");

            const curr_pass = masterPassword
            if (comparePassword(curr_pass, masterPassword)) {
                console.log("Master Password is correct");
                navigate("/dashboard");
            } else {
                console.log("Master Password is incorrect");
                alert("Master Password is incorrect");
            }
        }
    }

    const handlePassChange = (e) => {
        setMasterPassword(e.target.value);
    }

    return (
        <div className="bg-slate-950 flex flex-col items-center justify-center h-screen p-4">
            <div className="bg-slate-900 p-18 rounded-md shadow-lg flex flex-col">
                <h1 className="text-white">To Access Dashboard, please enter your Master Password</h1>

                <div className="relative w-64 mt-5">
                <input
                    type={showPass ? "text" : "password"}
                    placeholder="Master Password"
                    onChange={handlePassChange}
                    onKeyPress={handleEnter}
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
                <h1 className="text-white text-center mt-3">No Master Password?<a href="/createMaster" className="text-blue-500 underline ml-1">Create</a></h1>
            </div>
            
        </div>
    );
}

export default MasterPassword;