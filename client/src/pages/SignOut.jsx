import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OAuth from '../components/oAuth';

function SignUp() {
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
      const response = await axios.post("/api/auth/signup", formdata);
      const data = response.data;
      console.log(data);

      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return;
      }

      // Clear error state upon successful submission
      setLoading(false);
      setError(null);

      // Navigate to the '/signin' page upon successful signup
      navigate('/signin');
    } catch (error) {
      console.error("Form submission error", error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-center font-semibold text-3xl my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='username'
          id='username'
          onChange={handleChange}
          className='p-3 border rounded-lg'
        />
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
          {loading ? 'loading' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/signin'>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}

export default SignUp;
