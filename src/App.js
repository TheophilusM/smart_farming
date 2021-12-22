import React from "react";
import Login from './componets/Login'
import SignUp from './componets/SignUp';
import Dashboard from './componets/Dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
    </Router>
    </>
  );
}

export default App;
