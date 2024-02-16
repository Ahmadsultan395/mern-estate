import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({});

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
    console.log(formdata);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/signin", formdata);
      const data = response.data;
      console.log(data);
  
      if (data._id) {
        setLoading(false);
        setError(null);
      
        console.log("Navigate to home page");
        // Navigate to the '/signin' 
        navigate('/');
      } else {
        setError("Sign-in failed. Check your credentials.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Form submission error", error);
      setError(error.message);
      setLoading(false);
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
