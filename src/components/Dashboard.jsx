import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { usePersistStorage } from '../Hooks/usePersistStorage';
function Dashboard() {
    // Check if the user is logged in
    // If not, redirect to the login page
    // If logged in, display the dashboard
    const [signedIn, setSignedIn] = usePersistStorage("loggedin", false);
    if (!signedIn) {
        return <Navigate to="/" />
    }

    return (
        <div className="bg-slate-950 flex flex-col items-center justify-center h-screen p-4">
            <h1 className="text-white">Welcome to the dashboard!</h1>
        </div>
    )
};

export default Dashboard;