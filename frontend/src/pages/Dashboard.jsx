import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  
  const [count, setCount] = useState(0);   // State to store total number of customers

  useEffect(() => {     // useEffect runs once when the component mounts
    const fetchCount = async () => {   // Function to fetch customers from backend
      try {
        const res = await api.get("/customers");
        setCount(res.data.length || 0);
      } catch (err) {
        // ignore errors here, protected route handles redirect on token missing
      }
    };
    fetchCount();
  }, []);

  return (
    <div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* TOTAL CUSTOMERS CARD */}
    <div className="p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl 
                    border border-gray-200 hover:shadow-2xl hover:-translate-y-1 
                    transition-all duration-300">
      <h3 className="text-sm font-semibold text-gray-600 tracking-wide">
        Total Customers
      </h3>

      <p className="text-4xl font-extrabold text-gray-800 mt-2">
        {count}
      </p>

      <Link
        to="/customers"
        className="text-sm font-medium text-blue-600 hover:underline mt-3 inline-block"
      >
        View customers →
      </Link>
    </div>

    {/* QUICK ACTIONS CARD */}
    <div className="p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl 
                    border border-gray-200 hover:shadow-2xl hover:-translate-y-1 
                    transition-all duration-300">
      <h3 className="text-sm font-semibold text-gray-600 tracking-wide">
        Quick Actions
      </h3>

    <Link 
  to="/customers/add"
  className="block mt-4 bg-gradient-to-r from-green-600 to-green-700
             text-white py-2.5 px-4 rounded-lg shadow
             hover:opacity-90 active:scale-95 transition w-max"
>
  + Add customer
</Link>
    </div>

  </div>
</div>

  );
}
