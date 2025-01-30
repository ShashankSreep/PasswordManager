import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { usePersistStorage } from '../Hooks/usePersistStorage';
import { useState } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import PasswordCard from './PasswordCard';
import PassDisplay from './PassDisplay';
import {useEffect} from 'react';
import { retrieveAllEntries } from '../config/handlePassword';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Any time we add a new password, we should call the PasswordCard component
function Dashboard() {
    // Check if the user is logged in
    // If not, redirect to the login page
    // If logged in, display the dashboard

    const navigate = useNavigate();
    const [signedIn, setSignedIn] = usePersistStorage("loggedin", false);
    const [modalOpen, setModalOpen] = useState(false);
    const [entries, setEntries] = useState([]);
    const [photoURL, setPhotoURL] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPhotoURL(user.photoURL);
            }
        });
    });

    if (!signedIn) {
        return <Navigate to="/login" />;
    }
    

    const retrieveEntries = async () => {
      try {
        const allEntries = await retrieveAllEntries();
        setEntries(allEntries);
        console.log("Entries: ", entries);
      } catch (error) {
        console.error("Error retrieving entries: ", error);
      }
    }
    
    const handleNewClick = () => {
        console.log("New button clicked");
        setModalOpen(true);
    }

    const handleLogout = () => {
        console.log("Logout button clicked");
        setSignedIn(false);
        return <Navigate to="/login" />;
    }

    const handleSaveClick = () => {
        console.log("Save button clicked");
        setModalOpen(true);
        retrieveEntries(); // Retrieve all the entries from the database
    }


    // Top right of the page, there should be a button to show the user's profile 
    // It should contain their profile picture (from google) OR a default profile picture
    // On hover, it should display the user's email/username
    // When clicked, it should provide a drop down menu with the following options:
    // - Edit profile
    // - Change password
    // - Logout
    return (
      <div>
      <div className={`flex h-screen ${modalOpen ? "blur-md" : ""}`}>
          {/* Sidebar */}
          <div className="flex flex-col items-center w-30 bg-slate-900 p-4">
              <h2 className="text-white text-sm text-left font-bold">1Pass</h2>
              <button className="cursor-pointer mt-4" onClick={() => navigate("/profile")}>
                {/* Either the user.IMAGE URL OR this */}
                  <img
                      src={photoURL ? photoURL : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                  />
              </button>
              <button className="cursor-pointer mt-20 text-white text-sm hover:bg-slate-700 px-10 py-2 whitespace-nowrap font-bold">
                  All Items
              </button>
              <button className="cursor-pointer mt-1 text-white text-sm hover:bg-slate-700 px-10 py-2 font-bold">
                  Favorites
              </button>

              <div className="flex-grow"></div>
              <button
                  className="cursor-pointer text-white text-sm hover:bg-slate-700 px-10 py-2 font-bold"
                  onClick={handleLogout}
              >
                  Logout
              </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-slate-950 p-4">
              <input
                  type="text"
                  placeholder="Search"
                  className="w-96 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
              />
              <button
                  className="cursor-pointer mt-5 text-white text-sm bg-slate-700 hover:bg-slate-600 px-10 py-2 font-bold rounded-b rounded-t ml-5"
                  onClick={handleNewClick}
              >
                  New
              </button>
              {/* Call the PasswordCard to display to test for now */}
              {/* Should display all the passwords in the database */}
              {/*Reload the PasswordCard component to display the new password */}
              {/* pass the passwords list as a prop */}
              <PasswordCard />
          </div>
      </div>
      {modalOpen && <Modal closeModal={setModalOpen} />}
      </div>
  );
};
export default Dashboard;