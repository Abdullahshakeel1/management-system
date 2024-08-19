import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Img1 from '../../images/img.jpg';
import axios from 'axios';


const AddManagementPerson = () => {
  const [data,setData]=useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    mobile:"",
  })
  
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
};
const isValidData = ()=>{
  return data.name && data.email && data.password && data.confirmPassword && data.mobile
}



const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isValidData()) {
      alert('Please fill all the fields correctly.');
      return;
  }

  console.log('Data being sent:', data);

  try {
      const res = await axios.post('http://localhost:7600/management/signup', data, 
       {
            withCredentials: true 
          
      });
      console.log('Response:', res.data);
      alert('Person added successfully');
      setData({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        mobile:""
      });
  } catch (error) {
      if (error.response) {
          console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
          console.error('No response received:', error.request);
      } else {
          console.error('Error setting up the request:', error.message);
      }
      alert('There was an error adding the person.');
  }
};

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <>
      <section className=" dark:bg-gray-900 min-h-screen flex items-center">
        <div className="container mx-auto flex flex-wrap justify-between md:justify-between items-center">
          <div className="w-full md:w-1/2 lg:w-2/5 p-4 bg-[#7f5aa4]">
            <img className='w-full h-auto rounded-lg' src={Img1} alt="Background" />
          </div>
          <div className="w-full md:w-1/2 lg:w-2/4 px-20 py-10">
            <div className="bg-purple-100 rounded-lg shadow dark:border dark:border-gray-700 dark:bg-gray-800">
              <div className="p-6 space-y-6">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-purple-900 md:text-2xl dark:text-white">
                  Register to ECSMS
                </h1>
                <form className="space-y-6" onSubmit={handleSubmit}> 
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input
                    value={data.name}
                    onChange={handleChange}
                    type="text"
                     name="name"
                      id="name" 
                      className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required 
                      />
                  </div>
                  <div>
                    <label htmlFor="mobile" classmobile="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your mobile</label>
                    <input
                    value={data.mobile}
                    onChange={handleChange}
                    type="text"
                     name="mobile"
                      id="mobile" 
                      className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter phone number" required 
                      />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input
                    value={data.email}
                    onChange={handleChange}
                     type="email"
                      name="email"
                       id="email" 
                       className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required 
                       />
                  </div>
                  <div className="relative">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input
                    value={data.password}
                     onChange={handleChange}
                     type={passwordVisible ? 'text' : 'password'} 
                     name="password" 
                     id="password"
                      placeholder="••••••••" 
                      className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                       />
                    <div className="absolute inset-y-0 right-0 flex items-center px-2">
                      {passwordVisible ? (
                        <AiFillEyeInvisible onClick={togglePasswordVisibility} className="text-xl text-gray-500  mt-5 cursor-pointer" />
                      ) : (
                        <AiFillEye onClick={togglePasswordVisibility} className="text-xl text-gray-500 mt-5 cursor-pointer" />
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                    <input 
                    value={data.confirmPassword}
                     onChange={handleChange}
                    type={confirmPasswordVisible ? 'text' : 'password'}
                     name="confirmPassword" 
                     id="confirmPassword" 
                     placeholder="••••••••" 
                     className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
                     />
                    <div className="absolute inset-y-0 right-0 flex items-center px-2">
                      {confirmPasswordVisible ? (
                        <AiFillEyeInvisible onClick={toggleConfirmPasswordVisibility} className="text-xl text-gray-500  mt-5 cursor-pointer" />
                      ) : (
                        <AiFillEye onClick={toggleConfirmPasswordVisibility} className="text-xl text-gray-500 mt-5 cursor-pointer" />
                      )}
                    </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-purple-800 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddManagementPerson;
