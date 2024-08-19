import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LuLogIn } from "react-icons/lu";
function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
  

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };



    return (
        <div>
            <nav
                className={`bg-white shadow-xl h-screen fixed top-0 left-0 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-[250px] w-full md:w-[250px] z-50`}
            >
                <div className="relative flex flex-col ">
                    <div className="flex items-center justify-between px-4">
                        <h3 className="text-2xl font-bold text-[#7f5aa4] cursor-pointer">ECSMS</h3>
                        <button
                            onClick={toggleSidebar}
                            className="text-[#7f5aa4] md:hidden"
                        >
                            &times;
                        </button>
                    </div>
                    <ul className="space-y-3 my-8 flex-1">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) => `text-sm flex items-center px-8 py-4 transition-all ${isActive ? 'text-[#7f5aa4] border-r-[5px] border-[#7f5aa4] bg-gray-100' : 'text-black hover:text-[#7f5aa4] hover:border-r-[5px] border-[#7f5aa4] hover:bg-gray-100'}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="w-[18px] h-[18px] mr-4"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0" />
                                </svg>
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/user"
                                className={({ isActive }) => `text-sm flex items-center px-8 py-4 transition-all ${isActive ? 'text-[#7f5aa4] border-r-[5px] border-[#7f5aa4] bg-gray-100' : 'text-black hover:text-[#7f5aa4] hover:border-r-[5px] border-[#7f5aa4] hover:bg-gray-100'}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25px"
                                    height="25px"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#7f5aa4"
                                        d="M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2"
                                    />
                                </svg>
                                <span className="ml-3">User</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/login"
                                className={({ isActive }) => `text-sm flex items-center px-8 py-4 transition-all ${isActive ? 'text-[#7f5aa4] border-r-[5px] border-[#7f5aa4] bg-gray-100' : 'text-black hover:text-[#7f5aa4] hover:border-r-[5px] border-[#7f5aa4] hover:bg-gray-100'}`}
                            >
            <LuLogIn  className='text-[#7f5aa4] text-xl'/>

                                <span className="ml-3">Login</span>
                            </NavLink>
                        </li>
                    </ul>
                  
                </div>
            </nav>

            {!isOpen && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-4 left-4 z-50 text-[#7f5aa4] md:hidden"
                >
                    ☰
                </button>
            )}
        </div>
    );
}


export default Sidebar;
