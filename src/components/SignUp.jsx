import {auth, provider} from '../config/firebase';
import { useState } from 'react';
import { AuthContext } from '../Hooks/UseContext';
import { useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersistStorage } from '../Hooks/usePersistStorage';
import {doc, setDoc, getFirestore} from 'firebase/firestore';
import {db} from '../config/firebase';
import { setItem } from '../utils/localStorage';
import { retrieveMasterPassword } from '../config/firebase_api';
function SignUp() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showMasterPass, setShowMasterPass] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const {signedIn, setSignedIn} = useContext(AuthContext);

    const navigate = useNavigate();
    // Handle the change in the username input field
    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    // Handle the change in the password input field
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const toggleMasterPass = () => {
        setShowMasterPass(prevState => !prevState)
    }

    const togglePass = () => {
        setShowPass(prevState => !prevState)
    }
    

    //const auth = getAuth();
    // Function to create a new user
    const createUser = async () => {
        // Function to create a new user
        if (userName === "" || password === "") {
            alert("Username or password cannot be empty!");
        }

        
        try {
            const user_create = await createUserWithEmailAndPassword(auth, userName, password);
            console.log("User created successfully!");
            setUserName("");
            setPassword("");
            navigate("/login");
            console.log("Added ")
        } catch (error) {
            console.error("Error creating user: ", error);
        }
    }

    const createUserEnter = (e) => {
        if (e.key === "Enter" && userName !== "" && password !== "") {
            createUser();
        }
    }

    const googleSignIn = async () => {
        try {
            const popup = await signInWithPopup(auth, provider);
            console.log("User signed in successfully!");
            //setSignedIn(true);
            setItem("loggedin", true); // Set the signedIn state in localStorage
            // check if the user already has a master password
            const masterPassword = await retrieveMasterPassword(popup.user.email);
            if (masterPassword !== null) {
                navigate("/dashboard");
            } else {
              navigate("/createMaster");
            }
        } catch (error) {
            console.error("Error signing in: ", error);
        }
    }

    return (
        <div className="dark:bg-slate-950 bg-blue-100 flex flex-col items-center justify-center h-screen p-4">
          <div className="dark:bg-slate-900 bg-white p-18 rounded-md shadow-lg flex flex-col"> 
            <h1 className="dark:text-white text-slate-950 font-bold text-3xl">Sign Up</h1>
            
            <input 
              type="text" 
              placeholder="Username" 
              value={userName}
              onChange={handleUserNameChange}
              onKeyDown={(e) => {createUserEnter(e)}}
              className="w-64 px-4 py-2 border-b border-white-300 dark:text-white text-black mt-5 focus:outline-none"
            />
            <div className="relative w-64 mt-5">
                <input 
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
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
              <button className="px-25 py-2 bg-blue-700 hover:bg-blue-600 rounded-md text-white cursor-pointer" onClick={createUser}>Sign up</button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border rounded-md text-black shadow hover:bg-gray-100 cursor-pointer" onClick={googleSignIn}>
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google Icon"
                  className="w-5 h-5"
                />
                Login with Google
              </button>
            </div>
            
            <h1 className="text-black dark:text-white text-center mt-3">Already a User? <a href="/login" className="text-blue-800 dark:text-blue-500 underline ml-1">Login</a></h1>
          </div>
        </div>
      );
    }

export default SignUp;