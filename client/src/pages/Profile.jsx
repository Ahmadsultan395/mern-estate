import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import { app } from '../firebase';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from "firebase/storage"

function Profile() {
  const {currentUser} =useSelector((state)=> state.user);
  const fileRef = useRef(null);

const [file, setfile] = useState(undefined);
const [fileperc, setfileperc] = useState(0);
const [fileUploadError,setFileUploadError]=useState(false);
const [formData,setFormData]=useState(0);
// console.log(fileperc)
// console.log(file)
// console.log(formData)

//firebase storage 
//   allow read;
// allow write: if 
// request.resource.size > 2 *1024 * 1024 &&
// request.resource.contentType.matches("image/.*")

useEffect(()=>{
  if(file){
    handleFileUploaded(file);
  }
},[file])

const handleFileUploaded =(file)=>{
  const storage = getStorage(app);
  const fileName =  new Date().getTime()+ file.name;
  const storageRef = ref(storage,fileName);
  const uploadTask = uploadBytesResumable(storageRef,file);

  uploadTask.on("state_changed",
  (snapshort)=>{
    const progress = (snapshort.bytesTransferred/snapshort.totalBytes*100);
    // console.log("upload is "+ progress+"% done");
    setfileperc(Math.round(progress))
  },
  (eror)=>{
    setFileUploadError(true);
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
      setFormData({ ...formData, avatar :downloadURL})
    })
  }
  );
}

  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold my-7 text-center'>Profile</h1>
      <form className=' flex flex-col gap-4'>
        <input onChange={(e)=> setfile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>

        <img onClick={()=> fileRef.current.click()} className='rounded-full  h-24 w-24 self-center mt-2 object-cover cursor-pointer'
        src={formData.avatar || currentUser.avatar} alt="" />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>File Uploading Error(image must be less then 2mb)</span>
          ): fileperc > 0 && fileperc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${fileperc}%`}</span>
          ): fileperc === 100 ? (
            <span className='text-green-500'>Successfully Uploaded</span>
          ): ("")
          }
        </p>

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