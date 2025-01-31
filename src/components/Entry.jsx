import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isDarkContext } from "../Hooks/UseContext";
import { setItem } from "../utils/localStorage";

function Entry() {
  const navigate = useNavigate();
  const { isDark, setIsDark } = useContext(isDarkContext);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      setItem("isDark", true);
    } else {
      document.documentElement.classList.remove("dark");
      setItem("isDark", false);
    }
  }, [isDark]);

  const handleClick = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleDark = () => {
    setIsDark(!isDark);
  };

  return (
    <div>
      {/* Nav Bar */}
      <nav className="bg-white dark:bg-slate-900 backdrop-blur-lg bg-opacity-50 p-2 flex justify-between items-center rounded-full mt-7 mx-10 shadow-lg">
        <div className="text-slate-900 text-sm ml-4 font-bold dark:text-white">1Pass</div>
        <div className="flex items-center space-x-4">
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 transition-all duration-300 shadow-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={handleDark}
          >
            {isDark ? "☀️" :  "🌙"}
          </button>
          <button
            className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-600 cursor-pointer"
            onClick={handleClick}
          >
            Get started
          </button>
        </div>
      </nav>

      {/* Headings */}
      <h1 className="text-slate-700 mt-20 ml-12 text-8xl dark:text-white">Every sign-in,</h1>
      <h1 className="text-blue-300 ml-12 text-8xl dark:blue-300">secure</h1>

      {/* Right-Aligned Section */}
      <div className="flex flex-col items-end mt-12 mr-12">
        <h1 className="text-slate-700 text-right text-2xl dark:text-white">
          Never forget another password...
        </h1>
        <button
          className="text-white mt-4 bg-blue-700 px-8 py-2 rounded-full hover:bg-blue-600 cursor-pointer"
          onClick={handleSignUp}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Entry;
