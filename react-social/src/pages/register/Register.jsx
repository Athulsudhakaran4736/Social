import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();
  const clickHandler = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      password.current.setCustomValidity('Password does not match');
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post('/auth/register', user);
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_left">
          <h3 className="login_logo">FaceLook</h3>
          <span className="login_desc">Connect with friends and the world</span>
        </div>
        <div className="login_right">
          <form className="input_box" onSubmit={clickHandler}>
            <input
              type="name"
              placeholder="Username"
              className="input_bar"
              ref={username}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input_bar"
              ref={email}
              required
            />
            <input
              type="password"
              className="input_bar"
              placeholder="Password"
              ref={password}
              required
              minLength="6"
            />
            <input
              type="password"
              className="input_bar"
              placeholder="Confirm Password"
              ref={confirmPassword}
            />
            <button className="login_button" type="submit">
              Sign Up
            </button>
            <button className="login_register_button">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
