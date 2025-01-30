import { getAuth } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
        setEmail(user.email);
        setPhotoURL(user.photoURL);
      } else {
        console.log("No user signed in!");
      }
    });
  });

  const togglePass = () => {
    setShowPass((prevState) => !prevState);
  };

  // const handleResetPass = () => {
  //   // Handle the reset password portion here.
  //   // 1) Send an email to the user to reset
  //   // 2) User resets their master password
  //   // 3) Then, user logs back into the app and uses their new masterpassword
  // }

  return (
    <div className="bg-slate-950 flex flex-col items-center justify-center h-screen p-4">
      <div className="bg-slate-900 p-18 rounded-md shadow-lg flex flex-col">
        <h1 className="text-white text-3xl font-bold text-center">
          My Profile
        </h1>
        {/* Insert a button later, to change the permission to true/false for read-only */}
        <div className="flex justify-center mt-4">
          <button className="cursor-pointer">
            <img
              src={
                photoURL
                  ? photoURL
                  : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
              }
              alt="Profile"
              className="w-15 h-15 rounded-full"
            />
          </button>
        </div>
        <div className="flex flex-col">
          <label className="text-white text-sm mt-5">Name:</label>
          <input
            type="text"
            placeholder={name ? name : "No name provided"}
            readOnly={true}
            className="w-64 px-4 py-1 border-b border-white-300 text-white focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white text-sm mt-5">Email:</label>
          <input
            type="text"
            placeholder={email}
            readOnly={true}
            className="w-64 px-4 py-1 border-b border-white-300 text-white focus:outline-none"
          />
        </div>
        <div className="flex flex-col space-y-3 mt-8">
          <button className="px-8 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-white cursor-pointer" onClick={() => navigate("/dashboard")}>
            Reset Master Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
