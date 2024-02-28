import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess } from '../redux/user/userStore';

function Profile() {
  const { currentUser , loading , error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const [file, setFile] = useState(undefined);
  const [fileperc, setFileperc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username || '',
    email: currentUser.email || '',
    password: '',
  });
  const [updateSuccess , setUpdateSuccess]=useState(false);

  useEffect(() => {
    if (file) {
      handleFileUploaded(file);
    }
  }, [file]);

  const handleFileUploaded = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileperc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, avatar: downloadURL }));
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      console.log('Before API call:', formData);

      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('After API call:', data);

      if (!res.ok || data.success === false) {
        dispatch(updateUserFailure(data.message || 'Failed to update user.'));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message || 'An error occurred while updating user.'));
    }
  };

  const handleUserDelete = async ()=>{
    try {
      dispatch(deleteUserStart());
      if (!currentUser || !currentUser._id) {
        dispatch(deleteUserFailure("User ID is missing"));
        return;
      }
     const res = await fetch(`/api/user/delete/${currentUser._id}`, {
  method: 'DELETE',
});
      const data = await res.json();
      if (data.success === false) {
      dispatch(deleteUserFailure(data.message));
    return;
  }
  dispatch(deleteUserSuccess(data));
  
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold my-7 text-center'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />

        <img onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24 self-center mt-2 object-cover cursor-pointer'
          src={formData.avatar || currentUser.avatar} alt="" />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>File Uploading Error (image must be less than 2mb)</span>
          ) : fileperc > 0 && fileperc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${fileperc}%`}</span>
          ) : fileperc === 100 ? (
            <span className='text-green-500'>Successfully Uploaded</span>
          ) : ("")}
        </p>

        <input type="text" className='p-3 border rounded-lg'
          value={formData.username}
          onChange={handleChange}
          id="username"
          placeholder='username' />
        <input type="text" className='p-3 border rounded-lg'
          value={formData.email}
          onChange={handleChange}
          id="email"
          placeholder='email' />
        <input type="password" className='p-3 border rounded-lg'
          value={formData.password}
          onChange={handleChange}
          id="password"
          placeholder='password' />

        <button disabled={loading} className='text-white bg-slate-700 p-3 rounded-lg uppercase
          disabled:opacity-80 hover:opacity-95'>
            {loading ? "loading..." : "Update"}
          </button>
      </form>
      <div  className='flex justify-between text-red-600 mt-5 cursor-pointer'>
        <span onClick={handleUserDelete} >Delete Account</span>
        <span>Sign Out</span>
      </div>
      <p className='text-red-500 my-5'>{error ? error : ''}</p>
    <p className='text-green-700'>{updateSuccess ? "user updated successfully" : ''}</p>
    </div>
  );
}

export default Profile;
