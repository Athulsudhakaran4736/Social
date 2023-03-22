import React, { useContext, useRef } from 'react';
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
export default function Login() {
  const email = useRef();
  const password = useRef();
  const {user,isFetching,error,dispatch} = useContext(AuthContext)
  const clickHandler=(e)=>{
    e.preventDefault();
    loginCall({
      email:email.current.value,
      password:password.current.value,
    },dispatch)
    console.log(user)
  }
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_left">
          <h3 className="login_logo">FaceLook</h3>
          <span className="login_desc">Connect with friends and the world</span>
        </div>
        <div className="login_right">
          <form className="input_box" onSubmit={clickHandler}>
            <input type="email" placeholder="Email" className="input_bar" required ref={email}/>
            <input
              type="password"
              className="input_bar"
              placeholder="Password"
              required
              min='6'
              ref={password}
            />
            <button className="login_button">{isFetching? <CircularProgress color='inherit' size='25px' />:"Log In"}</button>
            <span className="forgot_button">Forgot Password?</span>
            <button className="login_register_button">
            {isFetching? <CircularProgress color='inherit' size='25px' />:"Create new account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
