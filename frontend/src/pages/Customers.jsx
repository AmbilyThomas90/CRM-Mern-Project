import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this customer?")) return;
    try {
      await api.delete(`/customers/${id}`);
      setCustomers(customers.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
   <div className="mt-6">

  {/* HEADER */}
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
      Customers
    </h2>

    <Link
      to="/customers/add"
      className="bg-gradient-to-r from-green-600 to-green-600 
                 text-white px-4 py-2 rounded-lg shadow-md 
                 hover:opacity-90 active:scale-95 transition"
    >
      +👤
  Add Customer
    </Link>
  </div>

  {/* EMPTY STATE */}
  {customers.length === 0 ? (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg 
                    border border-gray-200 text-center text-gray-600">
      No customers yet.
    </div>
  ) : (

    /* CUSTOMER LIST */
    <div className="grid gap-5">
      {customers.map(c => (
        <div
          key={c._id}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl 
                     border border-gray-200 flex justify-between items-start
                     hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >

          <div>
            <h3 className="text-lg font-semibold text-gray-800">{c.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{c.email}</p>
            <p className="text-sm text-gray-600">{c.phone}</p>
            <p className="text-sm text-gray-500 mt-1">{c.address}</p>
          </div>

          <div className="flex flex-col gap-3">
       <Link
  to={`/customers/edit/${c._id}`}
  className="text-sm bg-blue-500 text-white px-3 py-1.5  hover:bg-yellow-700
             rounded-lg shadow-md 
             transition active:scale-95"
>
  Edit
</Link>




<button
  onClick={() => handleDelete(c._id)}
  className="text-sm bg-gray-700 text-white border 
          hover:bg-red-700  px-3 py-1.5 rounded-lg shadow transition active:scale-95"
>
  Delete
</button>


          </div>

        </div>
      ))}
    </div>
  )}
</div>

  );
}
