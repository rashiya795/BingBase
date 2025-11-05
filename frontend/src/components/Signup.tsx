
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../config.ts";
export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // simple check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account created successfully ");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] px-4">
      <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              onChange={handleChange}
              value={formData.name}
              className="w-full px-3 py-2 rounded bg-[#2A2A2A] border border-gray-600 focus:outline-none focus:border-[#E50914]"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full px-3 py-2 rounded bg-[#2A2A2A] border border-gray-600 focus:outline-none focus:border-[#E50914]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={formData.password}
              className="w-full px-3 py-2 rounded bg-[#2A2A2A] border border-gray-600 focus:outline-none focus:border-[#E50914]"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              value={formData.confirmPassword}
              className="w-full px-3 py-2 rounded bg-[#2A2A2A] border border-gray-600 focus:outline-none focus:border-[#E50914]"
              placeholder="Re-enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#E50914] py-2 rounded font-medium hover:bg-[#b20710] transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-4">
          Already have an account?
          <Link to="/login" className="text-[#E50914] ml-1 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
