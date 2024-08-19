import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Error from './components/Error';
import { FaBars } from 'react-icons/fa';
import NotFound from './components/NotFound';
import User from './components/User';
import { AuthProvider, useAuth } from './components/AuthContext'; 

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { role } = useAuth(); // Access the role from the context

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-full min-h-screen">
      {isSidebarOpen && (
        <div className="fixed z-20 md:z-0 md:relative">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 md:ml-[250px]">
        <div className="p-4 md:hidden">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none focus:text-gray-700"
          >
            <FaBars size={24} />
          </button>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/user" element={<User role={role} />} /> {/* Pass role as prop */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<AppContent />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
