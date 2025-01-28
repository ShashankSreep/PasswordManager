import React from 'react';

function Modal({ closeModal }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-slate-900 px-20 py-10 rounded-md shadow-lg flex flex-col relative">
                <h1 className="text-white text-2xl font-bold">New Entry</h1>
                <button
                    className="absolute top-2 right-2 text-white text-2xl cursor-pointer rounded-full p-2"
                    onClick={() => closeModal(false)}
                >
                    X
                </button>
                <input
                    type="text"
                    placeholder="Name"
                    className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                />
                <input
                    type="text"
                    placeholder="Email/Username"
                    className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                />
                <input
                    type="text"
                    placeholder="Website"
                    className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                />
                <div className="flex flex-col space-y-3 mt-8">
                    <button
                        className="px-8 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-white cursor-pointer"
                        onClick={() => closeModal(false)}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
