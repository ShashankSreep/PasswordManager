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
import { isMasterContext } from "../Hooks/UseContext";
import { use } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function PassDisplay() {
  const { name } = useParams();
  const { isMaster, setIsMaster } = useContext(isMasterContext);
  const [showPass, setShowPass] = useState(false);
  if (!isMaster) {
    return <Navigate to="/dashboard" />;
  }

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
  };

  const handleExit = () => {
    setIsMaster(false);
    navigate("/dashboard");
  };

  const togglePass = () => {
    setShowPass((prevState) => !prevState);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        retrieveEntries(email);
      } else {
        console.log("No user signed in!");
      }
      return () => unsubscribe();
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-900 px-20 py-10 rounded-md shadow-lg flex flex-col relative">
        <h1 className="text-black dark:text-white text-2xl font-bold">Details</h1>
        <button
          className="absolute top-2 right-2 text-black dark:text-white text-2xl cursor-pointer rounded-full p-2"
          onClick={handleExit}
        >
          X
        </button>

        <div className="flex flex-col space-y-5 mt-5">
          <div className="flex flex-col">
            <label className="text-black dark:text-white mb-2 text-sm" htmlFor="name">
              Name:
            </label>
            <input
              id="name"
              type="text"
              placeholder={name}
              readOnly={true}
              className="w-64 px-4 py-2 border-b border-white-300 text-black dark:text-white focus:outline-none"
            />
          </div>
          {/* Email with Clipboard Icon */}
          <div className="flex flex-col">
            <label className="text-black dark:text-white mb-2 text-sm" htmlFor="email">
              Email:
            </label>
            <div className="flex items-center">
              <input
                id="email"
                type="text"
                placeholder={email}
                readOnly={true}
                className="w-64 px-4 py-2 border-b border-white-300 text-black dark:text-white focus:outline-none"
              />
              <button
                onClick={() => handleCopy(email)}
                className="ml-2 text-black dark:text-white hover:text-gray-400 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="20"
                  height="20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-7l-2-2z"
                  />
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
            <label className="text-black dark:text-white mb-2 text-sm" htmlFor="password">
              Password:
            </label>
            <div className="flex items-center">
              <div className="relative w-64">
                <input
                  id="password"
                  type="password"
                  placeholder={showPass ? password : "****************"}
                  readOnly={true}
                  className="w-64 px-4 py-2 border-b border-white-300 text-black dark:text-white focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black dark:text-white cursor-pointer"
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
              <button
                onClick={() => handleCopy(password)}
                className="ml-2 text-black dark:text-white hover:text-gray-400 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="20"
                  height="20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-7l-2-2z"
                  />
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
            <label className="text-black dark:text-white mb-2 text-sm" htmlFor="website">
              Website:
            </label>
            <div className="flex items-center">
              <input
                id="website"
                type="text"
                placeholder={website}
                readOnly={true}
                className="w-64 px-4 py-2 border-b border-white-300 text-black dark:text-white focus:outline-none"
              />
              <button
                onClick={() => handleCopy(website)}
                className="ml-2 text-black dark:text-white hover:text-gray-400 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="20"
                  height="20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-7l-2-2z"
                  />
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
          <button className="px-8 py-2 bg-blue-400 dark:bg-slate-700 hover:bg-blue-300 dark:hover:bg-slate-600 rounded-md text-white cursor-pointer">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PassDisplay;
