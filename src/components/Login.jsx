function Login() {
    return (
        <div className="bg-slate-900 flex flex-col items-center justify-center h-screen p-4">
            <h1 className="text-white font-bold text-2xl">Login</h1>
            <div>
                <input type="text" placeholder="Username" 
                className="px-8 py-2 rounded-md border border-white-300 text-white mt-5"/>
            </div>
            <div>
                <input type="password" placeholder="Password" 
                className="px-8 py-2 rounded-md border border-white-300 text-white mt-2"/>
            </div>
            <div>
                <button className="px-25 py-2 bg-white mt-2 rounded-b-full rounded-t-full">Login</button>
            </div>
        </div>
    )
}

export default Login;