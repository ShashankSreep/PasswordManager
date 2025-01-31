// This modal is going to be displayed EACH time a user tries to view their passwords
// Basically, the user will have to enter their master-password to view their passwords
// This will be a simple modal, to just verify their master-password


// On Submit, if the verification is successful, the user will be able to view their passwords i.e. taken to the page
// On Cancel, the user will be taken back to the dashboard i.e. CLOSE the modal
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserData } from "../config/firebase_api";
import { comparePassword } from "../SecurePass/password";
import { useParams } from "react-router-dom";
import { isMasterContext } from "../Hooks/UseContext";
import { useContext } from "react";
function VerifyMP() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { isMaster, setIsMaster } = useContext(isMasterContext);

  const togglePass = () => {
    setShowPass((prevState) => !prevState);
  };


  const handleSubmit = async () => {
    const userData = await getUserData();
    if (userData) {
      // First verify the password
      const res = await comparePassword(password, userData.email);
      if (res) {
        setIsMaster(true);
        return navigate(`/displaypass/${name}`);
      } else {
        alert("Incorrect Password");
      }
    }
  }

  const handleCancel = () => {
    navigate("/dashboard");
  }

  return (
    <div className="bg-blue-100 dark:bg-slate-950 flex flex-col items-center h-screen p-4">
        
      <div className="bg-white dark:bg-slate-900 p-8 rounded-md shadow-lg flex flex-col">
        <h1 className="text-black dark:text-white text-sm">
          Please enter your Master Password
        </h1>

        <div className="relative w-64 mt-2">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Master Password"
            onChange={(e) => setPassword(e.target.value)}
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
        <div className="flex flex-row mt-2 justify-between">
        <button
            className="bg-red-700 text-white mt-2 rounded-b rounded-t px-4 py-1 hover:bg-red-600 cursor-pointer"
        onClick={handleCancel}>
            Cancel
        </button>
        <button
          className="bg-slate-700 text-white mt-2 rounded-b rounded-t px-4 py-1 hover:bg-slate-600
            cursor-pointer"
        onClick={handleSubmit}>
          Submit
        </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyMP;