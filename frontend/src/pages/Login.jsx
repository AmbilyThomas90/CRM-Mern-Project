import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api"; // Axios instance or API helper

export default function Login() {
   // State to store form input values: email and password
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");   // State to store error messages
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {      // Send POST request to backend login endpoint
      const res = await api.post("/auth/login", form);
           // Save authentication token to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user_name", res.data.user?.name || "");      // Save user information to localStorage
      localStorage.setItem("user_email", res.data.user?.email || "");
      navigate("/dashboard");  // Navigate to the dashboard page
    } catch (error) {
      setErr(error.response?.data?.msg || error.message || "Login failed");
    }
  };

  return (
<div className="max-w-md mx-auto mt-10 
     bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20
     animate-gradient backdrop-blur-lg 
     p-8 rounded-2xl shadow-xl border border-gray-100">

  <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
    Welcome Back 👋
  </h2>

  {err && (
    <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg border border-red-300 text-sm">
      {err}
    </div>
  )}

  <form onSubmit={submit} className="space-y-4">
    <input
      name="email"
      value={form.email}
      onChange={handleChange}
      placeholder="Email"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2
                 focus:ring-blue-500 focus:border-blue-500 transition"
    />

    <input
      name="password"
      value={form.password}
      onChange={handleChange}
      type="password"
      placeholder="Password"
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2
                 focus:ring-blue-500 focus:border-blue-500 transition"
    />

    <button
      className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 
                 text-white font-semibold text-lg shadow-md hover:opacity-90 
                 transition active:scale-95"
    >
      Login
    </button>
  </form>

  <p className="mt-5 text-center text-sm text-gray-600">
    Don’t have an account?{" "}
    <Link to="/register" className="text-blue-600 font-medium hover:underline">
      Register
    </Link>
  </p>
</div>

  );
}
