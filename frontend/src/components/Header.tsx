import { useState,useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();




function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  // window.location.reload(); 
   navigate("/login"); 
}



    useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);
  return (
    <header className="flex items-center justify-between py-3 px-6 bg-black text-white shadow-md font-[Poppins,sans-serif] relative">
      {/* Left Section - Logo + Hamburger */}
      <div className="flex items-center space-x-3">
        <button
          className="md:hidden text-2xl focus:outline-none hover:text-[#E50914] transition duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Logo */}
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-extrabold tracking-wide">
            <span className="text-[#E50914]">Binge</span>
            <span className="text-white">Base</span>
            <span className="text-[#E50914]">.</span>
          </h1>
          <p className="text-xs text-gray-400 tracking-wide">
            Your Weekend Starts Here.
          </p>
        </div>
      </div>

      {/* Center Navbar (Desktop) */}
      <nav className="hidden md:flex flex-1 justify-center space-x-10 text-sm font-semibold">
        <Link to="/" className="hover:text-[#E50914] transition duration-300">
          Home
        </Link>
        <Link to="/browse" className="hover:text-[#E50914] transition duration-300">
          Browse
        </Link>
        <Link to="/favourites" className="hover:text-[#E50914] transition duration-300">
          Favourites
        </Link>
        <Link to="/picks" className="hover:text-[#E50914] transition duration-300">
          Weekend Picks
        </Link>
      </nav>

      {/* + Add (Desktop Only) */}
      <div className="hidden md:block">
        <Link to="/add">
          <button className="px-4 py-2 bg-[#E50914] text-sm hover:bg-red-700 text-white font-semibold rounded-md transition duration-300">
            + Add
          </button>
        </Link>
      </div>
{/* 
<Link
    to="/login"
    className="ml-2 text-sm font-medium bg-[#E50914] text-white px-4 py-2 rounded hover:bg-[#f6121d] transition"
  >
    Login
  </Link> */}

{username ? (
  <div className="relative">
    <div
      onClick={() => setShowMenu(!showMenu)}
      className="cursor-pointer ml-4 flex items-center justify-center w-10 h-10 bg-[#E50914] text-white font-bold rounded-full uppercase select-none"
    >
      {username.charAt(0)}
    </div>

    {showMenu && (
      <div className="absolute right-0 mt-2 w-36 bg-[#1f1f1f] text-white shadow-lg rounded-md py-2 border border-gray-700 z-50 animate-fadeIn">
        <p className="px-4 py-2 text-sm border-b border-gray-700">
          {username}
        </p>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 hover:bg-[#E50914] transition"
        >
          Logout
        </button>
      </div>
    )}
  </div>
) : (
  <Link
    to="/login"
    className="ml-2 text-sm font-medium bg-[#E50914] text-white px-4 py-2 rounded hover:bg-[#f6121d] transition"
  >
    Login
  </Link>
)}
   {/* Mobile Dropdown */}
      <div
        className={`absolute top-16 left-0 w-full bg-[#141414]/95 backdrop-blur-md flex flex-col items-center space-y-4 py-5 md:hidden shadow-2xl z-50 rounded-b-2xl transform transition-all duration-500 ease-in-out ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <Link to="/" className="w-full text-center py-2 hover:bg-[#E50914]/20 rounded-md transition duration-300">
          Home
        </Link>
        <Link to="/browse" className="w-full text-center py-2 hover:bg-[#E50914]/20 rounded-md transition duration-300">
          Browse
        </Link>
        <Link to="/favourites" className="w-full text-center py-2 hover:bg-[#E50914]/20 rounded-md transition duration-300">
          Favourites
        </Link>
        <Link to="/picks" className="w-full text-center py-2 hover:bg-[#E50914]/20 rounded-md transition duration-300">
          Weekend Picks
        </Link>

        {/* + Add inside dropdown */}
        <Link to="/add" className="w-[90%]">
          <button className="w-full py-2 bg-[#E50914] text-sm hover:bg-red-700 text-white font-semibold rounded-md transition duration-300 shadow-md">
            + Add
          </button>
        </Link>



      </div>
    </header>
  );
}