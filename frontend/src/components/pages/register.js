import { useContext, useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router";

import { AuthContext } from "../../context/AuthContext";
import { registerAdmin } from "../../apiCalls";

const Register = () => {
  const { dispatch } = useContext(AuthContext);

  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const uniqueId = useRef();
  const instituteId = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const user = {
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
      institute_id: instituteId.current.value,
    };
    registerAdmin(user, dispatch);
  };
  return (
    <div className="registerPageContainer loginPageContainer">
      <div className="login">
        <div className="loginContent register">
          <form className="loginBox" onSubmit={handleClick}>
            <h1>Register</h1>

            <div className="loginBoxContent">
              <div className="inputFieldBox">
                <h3>First Name</h3>
                <input
                  placeholder="Enter first name here..."
                  required
                  ref={firstName}
                  className="loginInput"
                  type="text"
                />
              </div>

              <div className="inputFieldBox">
                <h3>Last Name</h3>
                <input
                  placeholder="Enter last name here..."
                  required
                  ref={lastName}
                  className="loginInput"
                  type="text"
                />
              </div>

              <div className="inputFieldBox col-2">
                <h3>Email</h3>
                <input
                  placeholder="Enter email here..."
                  required
                  ref={email}
                  className="loginInput"
                  type="email"
                />
              </div>

              <div className="inputFieldBox">
                <h3>Institute ID</h3>
                <input
                  placeholder="Enter institute id here..."
                  required
                  ref={instituteId}
                  className="loginInput"
                  type="text"
                />
              </div>

              <div className="inputFieldBox">
                <h3>Unique ID</h3>
                <input
                  placeholder="Enter admin id here..."
                  ref={uniqueId}
                  className="loginInput"
                  type="text"
                />
              </div>

              <div className="inputFieldBox">
                <h3>Enter Password</h3>
                <input
                  placeholder="Enter Password"
                  required
                  ref={password}
                  className="loginInput"
                  type="password"
                  minLength="6"
                />
              </div>

              <div className="inputFieldBox">
                <h3>Confirm Password</h3>
                <input
                  placeholder="Confirm Password"
                  ref={passwordAgain}
                  className="loginInput"
                  type="password"
                />
              </div>
            </div>
            <button className="loginButton" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
