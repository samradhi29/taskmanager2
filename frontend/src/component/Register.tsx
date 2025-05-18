import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //post request to backend for register
    try {
      await axios.post('http://localhost:4000/api/auth/register', { name, email, password });
      toast.success('Registered successfully');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };
//registration form
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-950 to-black text-white px-4">
      <h1 className="text-2xl font-extrabold mb-10 text-fuchsia-300 text-left">
        create your <br className="sm:hidden" /> Account for Task Manager
      </h1>

      <div className="bg-black bg-opacity-90 p-8 rounded-2xl shadow-lg max-w-md w-full text-gray-100 border border-white">
        <h2 className="text-3xl font-semibold mb-6 text-center text-fuchsia-200">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-black placeholder-gray-400 text-gray-100 border border-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-black placeholder-gray-400 text-gray-100 border border-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-black placeholder-gray-400 text-gray-100 border border-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-800 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already registered?{' '}
          <Link to="/login" className="text-purple-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
