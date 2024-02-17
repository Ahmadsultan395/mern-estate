import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { signInSuccess } from '../redux/user/userStore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to authenticate with Google. Status: ${res.status}`);
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");

    } catch (error) {
      console.error('Could not sign in with Google account', error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="text-white bg-red-700 p-3 rounded-lg hover:opacity-95 uppercase"
    >
      Continue with Google
    </button>
  );
}
