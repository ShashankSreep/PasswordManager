// When a user adds a new password, this will basically create that card, and display it on the dashboard
// This should create a new card, for EACH password that the user adds
// From the dashboard, the user should be able to click on the card, and view the details related to that specific card
// The only thing initially visible on each card, will be the Name of the website/service the password is intended for
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveAllEntries } from "../config/handlePassword";
import { useEffect } from "react";
// import the refresh key
import { UpdateContext } from "../Hooks/UseContext";

// All I need to do, is basically get ALL the entries from the database, and display them as cards
// 1) Retrieve all the entries from the database
// 2) For each entry, create a new card with the name of the website/service
// 3) When the user clicks on the card, they should be taken to a new page, where they can view the details of that specific card
// 4) The details will include the email/username, password, and website/service name
// 5) The user should be able to copy the password to the clipboard => Handled by the PassDisplay component
function PasswordCard() {
    const navigate = useNavigate();
    const { refresh, setRefresh } = useContext(UpdateContext);
    // This stores a list of the names of the websites/services
    const [entries, setEntries] = useState([]);

    // This will retrieve all the entries from the database


    const retrieveEntries = async () => {
        try {
            // Returns an Array of all of the names of the websites/services
            const allEntries = await retrieveAllEntries();
            setEntries(allEntries); // For each entry, add the name to the entries array
            console.log("Entries: ", entries);
            // For each entry, add the name to the entries array
        } catch (error) {
            console.error("Error retrieving entries: ", error);
        }
    }

    // Should re-render each time the component is updated
    useEffect(() => {
        retrieveEntries();
    }, [refresh]);


    // Now, I need to display the cards for each entry
    // ONLY do this one time, when the component is first rendered
    return (
        <div className="mt-2">
            {entries.map((entry, index) => {
                return (
                    <div key={index} className="bg-slate-900 p-3 rounded-md shadow-lg flex flex-col cursor-pointer hover:bg-slate-800
                    tranform hover:scale-101 transition-transform duration-200 ease-in-out active:scale-98 transition-transform duration-200 ease-in-out mt-1"
                    onClick={() => navigate(`/displaypass/${entry}`)}>
                        <h1 className="text-white">{entry}</h1>
                    </div>
                );
            })}
        </div>
    );
}

export default PasswordCard;