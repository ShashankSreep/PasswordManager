
// This component should just contain the Nav Bar at the top of the page
import { useNavigate } from "react-router-dom";


function Entry () {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/login");
    }

    return (
        // Nav Bar
        <div>
            <nav className="backdrop-blur-lg bg-slate-900 bg-opacity-50 p-2 flex justify-between items-center rounded-t-full rounded-b-full mt-7 ml-10 mr-10">
            <div className="text-white text-sm ml-4 font-bold">
            1Pass
        </div>
        <button className="bg-blue-700 text-white px-15 py-2 rounded hover:bg-blue-950 rounded-t-full rounded-b-full mr-1 cursor-pointer" onClick={handleClick}>
            Get started
        </button>
        </nav>
        <h1 className="text-white mt-20 ml-50 text-8xl">Every sign-in,</h1>
        <h1 className="text-blue-300 ml-50 text-8xl">secure</h1>

        <div className="flex flex-col items-end mt-30 mr-50">
            <h1 className="text-white text-right text-2xl">Never forget another password...</h1>
            <button className="text-white mt-4 bg-blue-700 px-8 py-2 rounded hover:bg-blue-600 rounded-t-full rounded-b-full cursor-pointer" onClick={handleClick}>
            Sign up
        </button>
        </div>
        </div>
    )
}

export default Entry;