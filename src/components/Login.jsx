function Login() {
    return (
        <div className="bg-slate-950 flex flex-col items-center justify-center h-screen p-4">
            <div className="bg-slate-900 p-18 rounded-md shadow-lg flex flex-col"> 
                <h1 className="text-white font-bold text-3xl">Sign in</h1>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-64 px-4 py-2 border-b border-white-300 text-white mt-5 focus:outline-none"
                    />
                <div className="flex flex-col space-y-3 mt-8">
                    <button className="px-25 py-2 bg-blue-700 hover:bg-blue-600 rounded-md text-white cursor-pointer">Sign in</button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border rounded-md text-black shadow hover:bg-gray-100 cursor-pointer">
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google Icon"
                            className="w-5 h-5"
                        />
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
