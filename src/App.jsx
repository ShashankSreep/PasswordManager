// Root Component
import Entry from './components/Entry';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import { createContext, useState } from 'react';
import { AuthContext, UpdateContext } from './Hooks/UseContext';
import { usePersistStorage } from './Hooks/usePersistStorage';
import Modal from './components/Modal';
import MasterPassword from './components/MasterPassword';
import CreateMaster from './components/CreateMaster';
import Profile from './components/Profile';
import PassDisplay from './components/PassDisplay';
import VerifyMP from './components/VerifyMP';
import { useParams } from 'react-router-dom';
function App() {
  const [signedIn, setSignedIn] = usePersistStorage("loggedin", false);
  const [refresh, setRefresh] = usePersistStorage("refresh", false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <AuthContext.Provider value={{signedIn, setSignedIn}}>
    <UpdateContext.Provider value={{refresh, setRefresh}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entry />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/masterpass" element= {<MasterPassword />} />
        <Route path="/createMaster" element = {<CreateMaster />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/displaypass/:name" element={<PassDisplay />} />
        <Route path="/verify/:name" element={<VerifyMP />} />
      </Routes>
    </BrowserRouter>
    {modalOpen && <Modal setModalOpen={setModalOpen} />}
    </UpdateContext.Provider>
  </AuthContext.Provider>
  )
}

export default App;