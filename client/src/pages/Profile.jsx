import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const {currentUser} =useSelector((state)=> state.user);

  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold my-7 text-center'>Profile</h1>
      <form className=' flex flex-col gap-4'>
        <img className='rounded-full  h-24 w-24 self-center mt-2 object-cover cursor-pointer'
        src={currentUser.avatar} alt="" />

        <input type="text" className='p-3 border rounded-lg'  placeholder='username' />
        <input type="text" className='p-3 border rounded-lg'  placeholder='email' />
        <input type="text" className='p-3 border rounded-lg'  placeholder='password' />

        <button className='text-white bg-slate-700 p-3 rounded-lg uppercase 
        disabled:placeholder-opacity-80 hover:opacity-95'>Update</button>
      </form>
      <div className='flex justify-between text-red-600 mt-5'>
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile