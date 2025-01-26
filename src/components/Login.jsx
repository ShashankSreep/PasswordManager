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

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
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

   // const auth = getAuth();

    // Function to sign in user
    const signInUser = async () => {
        if (userName === "" || password === "") {
            alert("Username or password cannot be empty!");
        }

        try {
            const user_signin = await signInWithEmailAndPassword(auth, userName, password);
            console.log("User signed in successfully!");
            setUserName("");
            setPassword("");
            setItem("loggedin", true); // Set the signedIn state in localStorage
            navigate("/dashboard");
        } catch (error) {
            console.error("Error signing in: ", error);
        }
    }

    const googleSignIn = async () => {
        try {
            const popup = await signInWithPopup(auth, provider);
            console.log("User signed in successfully!");
            setItem("loggedin", true); // Set the signedIn state in localStorage
            navigate("/dashboard");
        } catch (error) {
            console.error("Error signing in: ", error);
        }
    }

    return (
        <div className="bg-slate-950 flex flex-col items-center justify-center h-screen p-4">
            <div className="bg-slate-900 p-18 rounded-md shadow-lg flex flex-col"> 
                <h1 className="text-white font-bold text-3xl">Sign in</h1>
                    <input 
                        type="text" 
                        placeholder="Username"
                        value={userName} // Set the value of the input field to the userName state
                        onChange={handleUserNameChange} // Call the handleUserNameChange function when the input field changes
                        className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} // Set the value of the input field to the password state
                        onChange={handlePasswordChange} // Call the handlePasswordChange function when the input field changes
                        className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                    />
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
            </div>
        </div>
    );
}

export default Login;