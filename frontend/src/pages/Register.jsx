import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await api.post("/auth/register", form);   // Send POST request to backend registration endpoint

       
      // after register, redirect to login
      navigate("/login");
    } catch (error) {
      setErr(error.response?.data?.msg || error.message || "Registration failed");
    }
  };

  return (
   <div className="max-w-md mx-auto mt-10 
     bg-white/80 backdrop-blur-xl p-8 rounded-2xl 
     shadow-2xl border border-gray-200">

  <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
    Create Account ✨
  </h2>

  {err && (
    <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg border border-red-300 text-sm">
      {err}
    </div>
  )}

  <form onSubmit={submit} className="space-y-4">

    <input
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Full Name"
      className="w-full p-3 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-green-500 focus:border-green-500 
                 transition bg-gray-50"
    />

    <input
      name="email"
      value={form.email}
      onChange={handleChange}
      placeholder="Email"
      className="w-full p-3 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-green-500 focus:border-green-500 
                 transition bg-gray-50"
    />

    <input
      name="password"
      value={form.password}
      onChange={handleChange}
      type="password"
      placeholder="Password"
      className="w-full p-3 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-green-500 focus:border-green-500 
                 transition bg-gray-50"
    />

    <button
      className="w-full py-3 rounded-lg 
                 bg-gradient-to-r from-green-900 to-green-700 
                 text-white font-semibold text-lg shadow-md 
                 hover:opacity-90 transition active:scale-95"
    >
      Register
    </button>
  </form>

  <p className="mt-5 text-center text-sm text-gray-600">
    Already have an account?{" "}
    <Link to="/login" className="text-blue-700 font-medium hover:underline">
      Login
    </Link>
  </p>
</div>

  );
}
