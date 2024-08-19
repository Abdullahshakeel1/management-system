

import Img1 from '../images/img.jpg'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Adjust path if needed

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setRole } = useAuth(); // Get setRole from context

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:7600/management/login', 
        { email, password }, 
        { withCredentials: true }
      );

      if (response.status === 200) {
        const user = response.data.user;
        setRole(user.role); // Update role in context
        navigate('/user'); // Navigate to the protected route
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#7f5aa4] dark:bg-gray-900 min-h-screen flex items-center">
    <div className="container mx-auto flex flex-wrap justify-between md:justify-between items-center">
      <div className="w-full md:w-1/2 lg:w-2/5 p-4 bg-[#7f5aa4]">
        <img className="w-full h-auto rounded-lg" src={Img1} alt="Background" />
      </div>
      <div className="w-full md:w-1/2 lg:w-2/4 px-20 py-10">
        <div className="bg-purple-100 rounded-lg shadow dark:border dark:border-gray-700 dark:bg-gray-800">
          <div className="p-6 space-y-6">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-purple-900 md:text-2xl dark:text-white">
              Login to ECSMS
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full text-white bg-purple-800 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Login;

