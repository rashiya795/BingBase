
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alertbox from "../components/Alertbox";
import { BASE_URL } from "../config";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);

    // Save token + username correctly
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.user.name); 

window.location.reload();


    setAlertData({
      title: "Success",
      message: "Logged in successfully 🎉",
    });
    setAlertOpen(true);

    // Redirect after success
    setTimeout(() => navigate("/"), 800);

  } catch (error: any) {
    setAlertData({
      title: "Login Failed",
      message: error.response?.data?.message || "Invalid email or password.",
    });
    setAlertOpen(true);
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] px-4">

      {/*  Alert Box */}
      <Alertbox
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        title={alertData.title}
        message={alertData.message}
      />

      <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-[#2A2A2A] border border-gray-600
              focus:outline-none focus:border-[#E50914]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-[#2A2A2A] border border-gray-600
              focus:outline-none focus:border-[#E50914]"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#E50914] py-2 rounded font-medium hover:bg-[#b20710] transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-4">
          Don’t have an account?
          <Link to="/signup" className="text-[#E50914] ml-1 hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}
