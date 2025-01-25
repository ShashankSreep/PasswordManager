// Root Component
import Entry from './components/Entry';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import { createContext, useState } from 'react';
import { AuthContext } from './Hooks/UseContext';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <AuthContext.Provider value={{signedIn, setSignedIn}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/dashboard" element={ signedIn ? <Dashboard /> : <Navigate to="/login" />}/>
      </Routes>
    </BrowserRouter>
  </AuthContext.Provider>
  )
}

export default App;
