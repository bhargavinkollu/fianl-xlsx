import React, { useEffect, useState } from "react";
import "./AdminLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../action/useraction";
import { useAlert } from "react-alert";
import { LOader } from "./LOader";
import axios from "axios";

export const Register = () => {
  const alert = useAlert();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState({
    username: "",
    userpwd: "",
    
  });
  const Input_Handler = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };
  const Submittion = (e) => {
    e.preventDefault();
    setAdminData(adminData);
    console.log(adminData);
    // setAdminData({
    //   username: "",
    //   userpwd: "",

    // })
    try {
        axios.post("http://localhost:5000/api/auth/adminregister",{email:"admin@gmail.com",password:"adminlogin",role:"admin"});
        
    } catch (error) {
        return error;
    }
    try {
        
        axios.post("http://localhost:5000/api/auth/employregister",{email:"employ@gmail.com",password:"employlogin"})
    } catch (error) {
        console.log(error);
    }
  };
  useEffect(() => {
    if (error) {
      console.log(error);
      // alert.error(error[message]);
      dispatch(clearErrors());
    }
  }, [error,dispatch,alert]);

  return (
    <>
   
   {loading?(<LOader/>):(   <div className="container">
        <div className="contentAdmin">
          <h3>Admin Login</h3>
          <form action="" onSubmit={Submittion}>
            <div className="flexbox">
              <h5>User name</h5>
              <input
                type="text"
                name="username"
                placeholder="Enter user name"
                onChange={Input_Handler}
                value={adminData.username}
              />
            </div>
            <div className="flexboxA">
              <h5>Password</h5>
              <input
                type="text"
                name="userpwd"
                placeholder="Enter password"
                onChange={Input_Handler}
                value={adminData.userpwd}
              />
            </div>
            <div className="buton">
              <input
                type="submit"
                value="Login"
                className="btn btn-success"
                id="buttonSubmit"
              />
            </div>
          </form>
        </div>
      </div>)}
    </>
  );
};
