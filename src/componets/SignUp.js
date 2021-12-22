import React, { useEffect, useState } from 'react'
import '../index.css'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { ScatterPlot } from '@mui/icons-material';

export default function SignUp() {
  const [error, setError] = useState('');
  const [user, setUser] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCornfirm, setPasswordConfirm] = useState('');
  const [projectID, setProjectID] = useState('');
  const navigate = useNavigate();

  const signUpUser = (e) => {
    e.preventDefault();
    if (
      firstname === "" ) {
        setError('Please fill in all fields!');
    } else {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          setFirstName('');
          setLastName('');
          setEmail('');
          setPhoneNumber('');
          setPassword('');
          setPasswordConfirm('');
          setProjectID('');
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        setUser(user);
      } else {
        // User is signed out
        // ...
      }
    });
    return () => {
      
    }
  }, [user])

    return (
    <div className="div">
        <form onSubmit={signUpUser} className="form">
          <div className="signupDiv">
            <div className="logoSection">
                <ScatterPlot className="logoIcon"/>
                <span className="logoText">Smart Farming</span>
            </div>
            {error.length > 1 && <span className="error">{error}</span>}
            <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}/>
            <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <input type="text" placeholder="Confirm Password" onChange={(e) => setPasswordConfirm(e.target.value)}/>
            <input maxLength="6" type="text" placeholder="Project ID (e.g. 289459)" onChange={(e) => setProjectID(e.target.value)}/>
            <span className="terms">
                <a href="/">Agree with T&amp;C's?</a>
                <input className="termsCheck" type="checkbox" placeholder="Email"/>
            </span>
            <button type="submit">SIGNUP</button>
            <span className="newUser">
              Already have an account? 
              <li>
                <Link className="newUserLink" to="/login">Login</Link>
              </li>
            </span>
          </div>
        </form>
    </div>
    )
}
