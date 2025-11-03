import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-8 px-6 font-[Poppins,sans-serif]">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10 border-b border-gray-800 pb-6">
        
        {/* About Section */}
        <div className="flex-1">
          <h2 className="text-white text-lg font-semibold mb-3">About BingeBase</h2>
          <p className="text-sm leading-relaxed">
            <span className="text-[#E50914] font-light">BingeBase</span>  helps you keep track of your favorite movies and TV shows all in one place.
            You can add what you watch, explore your list anytime, and organize your entertainment
            collection with ease.
          </p>
        </div>

        {/* Social / Contact Section */}
        <div className="flex-1 md:text-right">
          <h2 className="text-white text-lg font-semibold mb-3">Connect With Us</h2>
          <div className="flex md:justify-end space-x-5 text-xl mb-3">
            <a href="#" className="hover:text-[#E50914] transition duration-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#E50914] transition duration-300"><FaInstagram /></a>
            <a href="#" className="hover:text-[#E50914] transition duration-300"><FaTwitter /></a>
            <a href="#" className="hover:text-[#E50914] transition duration-300"><FaYoutube /></a>
          </div>
          <p className="text-sm">📩 support@bingebase.com</p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-semibold">BingeBase</span>. All rights reserved.
      </div>
    </footer>
  );
}
