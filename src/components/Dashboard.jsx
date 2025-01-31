import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersistStorage } from '../Hooks/usePersistStorage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { retrieveMasterPassword } from '../config/firebase_api';
import { isDarkContext } from '../Hooks/UseContext';
import { setItem } from '../utils/localStorage';
import Modal from './Modal';
import PasswordCard from './PasswordCard';
import { Navigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = usePersistStorage("loggedin", false);
  const [modalOpen, setModalOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [photoURL, setPhotoURL] = useState("");
  const [user, setUser] = useState("");
  const { isDark, setIsDark } = useContext(isDarkContext);

  const masterExists = async (email) => {
    const masterPassword = await retrieveMasterPassword(email);
    if (masterPassword === null) {
      navigate("/createMaster");
    }
  }

  // Use useEffect to handle dark mode
  useEffect(() => {
    // Set initial dark mode state from localStorage
    if (isDark) {
      document.documentElement.classList.add("dark");
      setItem("isDark", true);
    } else {
      document.documentElement.classList.remove("dark");
      setItem("isDark", false);
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        masterExists(user.email);
        setPhotoURL(user.photoURL);
      }
    });
  }, [isDark]); // Trigger effect whenever isDark changes

  if (!signedIn) {
    return <Navigate to="/login" />;
  }

  const retrieveEntries = async () => {
    try {
      const allEntries = await retrieveAllEntries();
      setEntries(allEntries);
    } catch (error) {
      console.error("Error retrieving entries: ", error);
    }
  }

  const handleNewClick = () => {
    setModalOpen(true);
  }

  const handleLogout = () => {
    setSignedIn(false);
    return <Navigate to="/login" />;
  }

  const handleDark = () => {
    // Toggle the dark mode state
    setIsDark(prevState => {
      const newState = !prevState;
      setItem("isDark", newState); // Update localStorage
      return newState;
    });
  }

  return (
    <div>
      <div className={`flex h-screen ${modalOpen ? "blur-md" : ""}`}>
        {/* Sidebar */}
        <div className="flex flex-col items-center w-30 bg-white dark:bg-slate-900 p-4">
          <h2 className="text-black dark:text-white text-sm text-left font-bold cursor-pointer" onClick={() => navigate('/')}>1Pass</h2>
          <button className="cursor-pointer mt-4" onClick={() => navigate("/profile")}>
            <img
              src={photoURL ? photoURL : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </button>
          <button
            className="mt-3 w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 transition-all duration-300 shadow-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={handleDark}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          <button className="cursor-pointer mt-20 text-black dark:text-white text-sm hover:bg-blue-200 dark:hover:bg-slate-700 px-10 py-2 whitespace-nowrap font-bold">
            All Items
          </button>
          <button className="cursor-pointer mt-1 text-black dark:text-white text-sm hover:bg-blue-200 dark:hover:bg-slate-700 px-10 py-2 font-bold">
            Favorites
          </button>
          <div className="flex-grow"></div>
          <button
            className="cursor-pointer text-black dark:text-white text-sm hover:bg-blue-200 dark:hover:bg-slate-700 px-10 py-2 font-bold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-blue-100 dark:bg-slate-950 p-4">
          <input
            type="text"
            placeholder="Search"
            className="w-96 px-4 py-2 border-b border-white-300 text-black dark:text-white mt-5 focus:outline-none"
          />
          <button
            className="cursor-pointer mt-5 text-white text-sm bg-blue-400 dark:bg-slate-700 hover:bg-blue-300 dark:hover:bg-slate-600 px-10 py-2 font-bold rounded-b rounded-t ml-5"
            onClick={handleNewClick}
          >
            New
          </button>
          <PasswordCard />
        </div>
      </div>
      {modalOpen && <Modal closeModal={setModalOpen} />}
    </div>
  );
}

export default Dashboard;
