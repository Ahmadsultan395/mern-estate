import React from 'react'
import {Link} from "react-router-dom"

function SignOut() {
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-center font-semibold text-3xl my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='username' id='username' className='p-3 border rounded-lg' />
        <input type="email" placeholder='email' id='email' className='p-3 border rounded-lg' />
        <input type="password" placeholder='password' id='password' className='p-3 border rounded-lg' />
        <button className='bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
       <Link to={"/signin"}> <span className='text-blue-700'>Sign in</span></Link>
      </div>
    </div>
  )
}

export default SignOut