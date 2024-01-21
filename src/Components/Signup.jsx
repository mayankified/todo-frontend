import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup, islogin, islogout } from '../Features/Userslice'
import { toast } from 'react-toastify'


const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if(userData.name&&userData.password){
      
      
      dispatch(signup(userData))
      .then((response) => {
        if(response.payload.responseData.success){
          toast.success(response.payload.responseData.message); 
          navigate('/');
        }
        else{
          toast.error(response.payload.responseData.message); 
        }
        
      })
      .catch((error) => {
        console.error(error); 
        toast.error("Signup failed. Please try again later."); 
      });
    }
    else{
      toast.error('Fill all the details!')
    }
  }

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <div className="container max-w-[400px] h-fit bg-blue-100 rounded-lg overflow-hidden mx-6">
        <form onSubmit={handleSignup} className="flex xs:text-[16px] text-[14px] items-center flex-col p-8 gap-4 text-center">
          <div className="head flex flex-col gap-4">
            <span className="text-xl font-bold text-black">TinuDo</span>
            <p className="text-base text-gray-600">Getting Started !</p>
          </div>
          <div className="inputs overflow-hidden bg-white w-full p-2 rounded-md border-b text-[#131312] border-gray-300">
            <input
              type="text"
              name='name'
              value={userData.name}
              onChange={handleInputChange}
              className="border-none outline-none w-full h-10 border-b-2 border-gray-300"
              placeholder="Your Name"
            />
          </div>
          <div className="inputs overflow-hidden bg-white w-full p-2 rounded-md border-b text-[#131312] border-gray-300">
            <input
              type="email"
              name='email'
              value={userData.email}

              onChange={handleInputChange}
              className="border-none outline-none w-full h-10 border-b-2 border-gray-300"
              placeholder="Your Email"
            />
          </div>
          <div className="inputs overflow-hidden bg-white w-full p-2 rounded-md border-b text-[#131312] border-gray-300">
            <input
              type="password"
              onChange={handleInputChange}
              value={userData.password}

              name='password'
              className="border-none outline-none w-full h-10 border-b-2 border-gray-300"
              placeholder="Password"
            />
          </div>
          <button type='submit' className="bg-blue-400 text-white w-full h-10 py-2 rounded-md font-semibold transition duration-2 ease-in-out hover:bg-blue-700">
            Sign up
          </button>
        </form>
        <div className="form-footer bg-blue-200 p-4 text-base text-center">
          <p className='text-[#00040f]'>
            Have an account? <Link to={'/'} className="font-bold text-blue-600 transition duration-300 ease-in-out hover:text-blue-700">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup