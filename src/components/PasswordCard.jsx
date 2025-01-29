// When a user adds a new password, this will basically create that card, and display it on the dashboard
// This should create a new card, for EACH password that the user adds
// From the dashboard, the user should be able to click on the card, and view the details related to that specific card
// The only thing initially visible on each card, will be the Name of the website/service the password is intended for
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
function PasswordCard({name}) {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log("Clicked!");
        // Pass in the Name Prop to the PassDisplay component
        navigate("/displaypass", {state: {name: "Google"}});
    }

    return (
        <div className="mt-2">
            <div className="bg-slate-900 p-3 rounded-md shadow-lg flex flex-col cursor-pointer hover:bg-slate-800
            tranform hover:scale-101 transition-transform duration-200 ease-in-out active:scale-98 transition-transform duration-200 ease-in-out"
            onClick={handleClick}>
                <h1 className="text-white">Google</h1>
            </div>
            <div className="bg-slate-900 p-3 rounded-md shadow-lg flex flex-col mt-1 mb-1 cursor-pointer hover:bg-slate-800 
                tranform hover:scale-101 transition-transform duration-200 ease-in-out active:scale-98 transition-transform duration-200 ease-in-out"
                onClick={handleClick}>
                <h1 className="text-white">Facebook</h1>
            </div>
            <div className="bg-slate-900 p-3 rounded-md shadow-lg flex flex-col cursor-pointer hover:bg-slate-800
            tranform hover:scale-101 transition-transform duration-200 ease-in-out active:scale-98 transition-transform duration-200 ease-in-out"
            onClick={handleClick}>
                <h1 className="text-white">Twitter</h1>
            </div>
            <div className="bg-slate-900 p-3 rounded-md shadow-lg flex flex-col mt-1 mb-1 cursor-pointer hover:bg-slate-800
            tranform hover:scale-101 transition-transform duration-200 ease-in-out active:scale-98 transition-transform duration-200 ease-in-out"
            onClick={handleClick}>
                <h1 className="text-white">Instagram</h1>
            </div>
        </div>
    );
}

export default PasswordCard;