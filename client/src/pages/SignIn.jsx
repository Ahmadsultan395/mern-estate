import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {signInStart,signInSuccess,signInFailure} from "../redux/user/userStore.js"
import {  useDispatch, useSelector } from 'react-redux';

function SignIn() {
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({});

  const dispatch = useDispatch();
  const {loading,error} = useSelector((state)=> state.user);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
    console.log(formdata);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await axios.post("/api/auth/signin", formdata);
      const data = response.data;
      console.log(data);
  
      if (data._id) {
        dispatch(signInSuccess(data));
        navigate('/');
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      console.error("API Error:", error);
  
      if (error.response) {
          console.error("Response Data:", error.response.data);
          console.error("Response Status:", error.response.status);
          console.error("Response Headers:", error.response.headers);
      }
  
      if (error.response && error.response.status === 404) {
          dispatch(signInFailure("User not found"));
      } else if (error.response && error.response.status === 401) {
          dispatch(signInFailure("Wrong credentials"));
      } else {
          dispatch(signInFailure("An error occurred while signing in"));
      }
    }
  };
  

  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-center font-semibold text-3xl my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='email'
          id='email'
          onChange={handleChange}
          className='p-3 border rounded-lg'
        />
        <input
          type='password'
          placeholder='password'
          id='password'
          onChange={handleChange}
          className='p-3 border rounded-lg'
        />
        <button
          disabled={loading}
          className='bg-slate-700 p-3 rounded-lg uppercase text-white hover:opacity-95
         disabled:opacity-80'
        >
          {loading ? 'loading' : 'Sign In'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't Have an account?</p>
        <Link to='/signup'>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

export default SignIn;
