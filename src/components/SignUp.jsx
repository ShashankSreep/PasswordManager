import {auth, provider} from '../config/firebase';
import { useState } from 'react';
import { AuthContext } from '../Hooks/UseContext';
import { useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function SignUp() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const {signedIn, setSignedIn} = useContext(AuthContext);
    const navigate = useNavigate();
    // Handle the change in the username input field
    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
        return;
    }

    // Handle the change in the password input field
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
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
        } catch (error) {
            console.error("Error creating user: ", error);
        }
    }

    const googleSignIn = async () => {
        try {
            const popup = await signInWithPopup(auth, provider);
            console.log("User signed in successfully!");
            setSignedIn(true);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error signing in: ", error);
        }
    }

    return (
        <div className="bg-slate-950 flex flex-col items-center justify-center h-screen p-4">
            <div className="bg-slate-900 p-18 rounded-md shadow-lg flex flex-col"> 
                <h1 className="text-white font-bold text-3xl">Sign Up</h1>
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
                <h1 className="text-white text-center mt-3">Already a User? <a href="/login" className="text-blue-500 underline ml-1">Login</a></h1>
            </div>
        </div>
    );
}

export default SignUp;