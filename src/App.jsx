// Root Component
import Entry from './components/Entry';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import { createContext, useState } from 'react';
import { AuthContext } from './Hooks/UseContext';
import { usePersistStorage } from './Hooks/usePersistStorage';
import Modal from './components/Modal';

function App() {
  const [signedIn, setSignedIn] = usePersistStorage("loggedin", false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <AuthContext.Provider value={{signedIn, setSignedIn}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!signedIn? <Entry /> : <Navigate to="/dashboard" />}/>
        <Route path="/login" element={!signedIn? <Login /> : <Navigate to ="/dashboard" />}/>
        <Route path="/signup" element={!signedIn ? <SignUp /> : <Navigate to="/dashboard" />}/>
        <Route path="/dashboard" element={ <Dashboard />}/>
      </Routes>
    </BrowserRouter>
    {modalOpen && <Modal setModalOpen={setModalOpen} />}
  </AuthContext.Provider>
  )
}

export default App;
