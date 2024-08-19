import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthContext'; // Adjust path if needed
import Management from './management/Management';
import AddUser from './addUser';
import UserList from './userList';

const User = () => {
  const [view, setView] = useState(null);
  const navigate = useNavigate();
  const { role, setRole } = useAuth(); // Get role and setRole from context

  const handleViewChange = (viewType) => {
    setView(viewType);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:7600/management/managementLogout', {}, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setRole(null); // Clear role in context on logout
        navigate('/login');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error.response ? error.response.data : error.message);
    }
  };

  if (role === null) {
    return <h1 className='text-center text-red-500 font-semibold '>your are not Autherized Person</h1>; // Optional: Display a loading state while role is being determined
  }

  return (
    <div className='bg-[#7f5aa4]'>
      <div className="py-5">
        <div className="flex flex-col items-center mt-8">
          <div className="flex gap-10 mb-8">
            <button
              onClick={handleLogout}
              className="bg-red-400 text-[#7f5aa4] px-4 py-2 rounded-md hover:bg-[#ffffff] hover:text-gray-900"
            >
              Logout
            </button>
            {role === "admin" ? (
              <>
                <button
                  className='h-10 w-32 bg-[#ffffff] text-black px-4 rounded-full hover:bg-red-400 hover:text-white'
                  onClick={() => handleViewChange('Management')}
                >
                  Management
                </button>
                <button
                  className='h-10 w-32 bg-[#ffffff] text-black px-4 rounded-full hover:bg-red-400 hover:text-white'
                  onClick={() => handleViewChange('addUser')}
                >
                  Add Person
                </button>
                <button
                  className='h-10 w-32 bg-[#ffffff] text-black px-4 rounded-full hover:bg-red-400 hover:text-white'
                  onClick={() => handleViewChange('UserList')}
                >
                  Person List
                </button>
              </>
            ) : (
              <>
                <button
                  className='h-10 w-32 bg-[#ffffff] text-black px-4 rounded-full hover:bg-red-400 hover:text-white'
                  onClick={() => handleViewChange('addUser')}
                >
                  Add Person
                </button>
                <button
                  className='h-10 w-32 bg-[#ffffff] text-black px-4 rounded-full hover:bg-red-400 hover:text-white'
                  onClick={() => handleViewChange('UserList')}
                >
                  Person List
                </button>
              </>
            )}
          </div>
          {view === 'Management' && <Management />}
          {view === 'addUser' && <AddUser />}
          {view === 'UserList' && <UserList />}
        </div>
      </div>
    </div>
  );
};

export default User;
