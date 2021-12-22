import React, { useState } from 'react'
import '../index.css'
import 'firebase/app'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { ScatterPlot } from '@mui/icons-material';

export default function Login() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signInUser = (e) => {
    e.preventDefault();
    if (
      email === "" ) {
        setError('Please fill in all fields!');
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            navigate("/")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            // ..
        });
      }
  };

    return (
      <div className="div">
        <form className="form"  onSubmit={signInUser}>
          <div className="loginDiv">
            <div className="logoSection">
                <ScatterPlot className="logoIcon"/>
                <span className="logoText">Smart Farming</span>
            </div>
            {error.length > 1 && <span className="error">{error}</span>}
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">LOGIN</button>
            <span className="newUser">
              New user?
              <li>
                <Link className="newUserLink" to="/signup">SignUp</Link>          
              </li>
            </span>
          </div>
        </form>
      </div>
    )
}
