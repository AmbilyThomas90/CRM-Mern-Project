import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function AddEditCustomer() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const params = useParams();   // Get URL parameters (used to check if editing an existing customer)
  const isEdit = Boolean(params.id);   // Boolean flag to check if this is an edit form

  useEffect(() => {
    if (isEdit) {
      // load customer data
      api.get(`/customers/${params.id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [isEdit, params.id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.name) return setErr("Name is required");
    try {
      if (isEdit) {
        await api.put(`/customers/${params.id}`, form);
      } else {
        await api.post("/customers", form);
      }
      navigate("/customers");
    } catch (error) {
      setErr(error.response?.data?.msg || "Save failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white/80 backdrop-blur-md 
                p-8 rounded-2xl shadow-xl border border-gray-200 
                transition hover:shadow-2xl">

  <h2 className="text-3xl font-extrabold mb-6 text-gray-800 tracking-wide">
    {isEdit ? "Edit Customer" : "Add Customer"}
  </h2>

  {err && (
    <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg border border-red-300">
      {err}
    </div>
  )}

  <form onSubmit={submit} className="space-y-4">

    <input
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Full Name"
      className="w-full p-3 border rounded-lg bg-gray-50 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition shadow-sm"
    />

    <input
      name="email"
      value={form.email}
      onChange={handleChange}
      placeholder="Email"
      className="w-full p-3 border rounded-lg bg-gray-50 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                 transition shadow-sm"
    />

    <input
      name="phone"
      value={form.phone}
      onChange={handleChange}
      placeholder="Phone"
      className="w-full p-3 border rounded-lg bg-gray-50
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition shadow-sm"
    />

    <textarea
      name="address"
      value={form.address}
      onChange={handleChange}
      placeholder="Address"
      className="w-full p-3 border rounded-lg bg-gray-50 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition shadow-sm"
      rows="3"
    ></textarea>

    <div className="flex gap-3 pt-2">

     <button
  className="bg-gradient-to-r from-blue-600 to-blue-700
             text-white px-5 py-2.5 rounded-lg shadow-md
             hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600
             active:scale-95 transition-all"
>
  {isEdit ? "Update" : "Add"}
</button>

      <button
        type="button"
        onClick={() => navigate("/customers")}
        className="px-5 py-2.5 rounded-lg bg-gray-200 text-gray-800 
                   hover:bg-gray-300 active:scale-95 transition"
      >
        Cancel
      </button>

    </div>
  </form>
</div>

  );
}
