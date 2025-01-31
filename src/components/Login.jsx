import React from 'react';
import {auth, provider} from '../config/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import {useState } from 'react';
import { AuthContext } from '../Hooks/UseContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersistStorage } from '../Hooks/usePersistStorage';
import { setItem } from '../utils/localStorage';
import { use } from 'react';
import { useEffect } from 'react';
import { retrieveMasterPassword } from '../config/firebase_api';

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();


    const { signedIn, setSignedIn } = useContext(AuthContext);


    // Handle the change in the username input field
    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    // Handle the change in the password input field
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const togglePass = () => {
        setShowPass(prevState => !prevState)
    }

   // const auth = getAuth();

    // Function to sign in user
    const signInUser = async () => {
        if (userName === "" || password === "") {
            alert("Username or password cannot be empty!");
        }

        // Verify the password is at least 8 characters long
        // and contains at least one special character

        try {
            const user_signin = await signInWithEmailAndPassword(auth, userName, password);
            console.log("User signed in successfully!");
            setUserName("");
            setPassword("");
            setItem("loggedin", true); // Set the signedIn state in localStorage
            const masterPassword = await retrieveMasterPassword(user_signin.user.email); 
            if (masterPassword !== null) {
                navigate("/dashboard");
            } else {
                navigate("/createMaster"); // TODO: Update to navigate to the MasterPassword
            }
        } catch (error) {
            console.error("Error signing in: ", error);
            alert("Invalid username or password");
            setUserName("");
            setPassword("");
        }
    }

    const googleSignIn = async () => {
        try {
            const popup = await signInWithPopup(auth, provider);
            console.log("User signed in successfully!");
            setItem("loggedin", true); // Set the signedIn state in localStorage
            // Check if the user has a master password, if they do navigate to the dashboard
            const masterPassword = await retrieveMasterPassword(popup.user.email);
            if (masterPassword !== null) {
                navigate("/dashboard");
            } else {
                navigate("/createMaster"); // TODO: Update to naviate to the MasterPassword
            }
        } catch (error) {
            console.error("Error signing in: ", error);
        }
    }

    const logUserEnter = (e) => {
        if (e.key === "Enter" && userName !== "" && password !== "") {
            signInUser();
        }
    }

    return (
        <div className="bg-blue-100 dark:bg-slate-950 flex flex-col items-center justify-center h-screen p-4">
            <div className="bg-white dark:bg-slate-900 p-18 rounded-md shadow-lg flex flex-col"> 
                <h1 className="text-black dark:text-white font-bold text-3xl">Sign in</h1>
                    <input 
                        type="text" 
                        placeholder="Username"
                        onKeyDown={(e) => logUserEnter(e)} // Call the logUserEnter function when the user presses a key
                        value={userName} // Set the value of the input field to the userName state // Call the logUserEnter function when the user presses a key
                        onChange={handleUserNameChange} // Call the handleUserNameChange function when the input field changes
                        className="w-64 px-4 py-2 border-b border-white-300 text-black dark:text-white mt-5 focus:outline-none"
                    />
                    <div className="relative w-64 mt-5">
                        <input 
                            type= {showPass ? "text" : "password"} 
                            placeholder="Password" 
                            value={password} // Set the value of the input field to the password state
                            onChange={handlePasswordChange} // Call the handlePasswordChange function when the input field changes
                            onKeyDown={(e) => logUserEnter(e)}
                            className="w-full px-4 py-2 border-b border-white-300 text-black dark:text-white focus:outline-none"
                        />
                        <button 
                            type="button" 
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black dark:text-white cursor-pointer"
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
                <div className="flex flex-col space-y-3 mt-8">
                    <button className="px-25 py-2 bg-blue-700 hover:bg-blue-600 rounded-md text-white cursor-pointer" onClick={signInUser}>Sign in</button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border rounded-md text-black shadow hover:bg-gray-100 cursor-pointer" onClick={googleSignIn}>
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google Icon"
                            className="w-5 h-5"
                        />
                        Login with Google
                    </button>
                </div>
                <h1 className="text-black dark:text-white text-center mt-3">Don't have an account? <a href="/signup" className="text-blue-500 underline ml-1">Sign Up</a></h1>
                <h1 className="text-black dark:text-white text-center mt-3">Forgot Password? <a href="/login" className="text-blue-500 underline ml-1">Reset</a></h1>
            </div>
        </div>
    );
}

export default Login;