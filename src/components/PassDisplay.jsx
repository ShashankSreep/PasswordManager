// Once the user clicks on the card, they should be able to view the details of their password, which is going to be shown in a modal/pop-up
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { decryptPass } from "../SecurePass/encrypt";
import { retrieveEntry } from "../config/handlePassword";
import { useParams } from "react-router-dom";
function PassDisplay() {
    const { name } = useParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [website, setWebsite] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await retrieveEntry(name);
                console.log("Data: ", data);
                const decryptedPass = await decryptPass(name);
                console.log("Decrypted Password: ", decryptedPass);
                setEmail(data.Email);
                setPassword(decryptedPass);
                setWebsite(data.Website);
            } catch (error) {
                console.error("Error retrieving data: ", error);
            }
        };
        getData();

    }, []);

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-slate-900 px-20 py-10 rounded-md shadow-lg flex flex-col relative">
                    <h1 className="text-white text-2xl font-bold">Details</h1>
                    <button
                        className="absolute top-2 right-2 text-white text-2xl cursor-pointer rounded-full p-2"
                    >
                        X
                    </button>
                    <input
                        type="text"
                        placeholder={name}
                        readOnly={true}
                        className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder={email}
                        readOnly={true}
                        className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder={password}
                        readOnly={true}
                        className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder={website}
                        readOnly={true}
                        className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                    />
                    <div className="flex flex-col space-y-3 mt-8">
                        <button
                            className="px-8 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-white cursor-pointer"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        );
}

export default PassDisplay;