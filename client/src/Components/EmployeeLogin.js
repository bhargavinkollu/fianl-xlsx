import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, emplyelogin, login } from "../action/useraction";
import "./EmployeeLogin.css";
import logo from "../Image/adminloginlogo.png";
import sideimg from "../Image/Rectangle 142.jpg";

import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
export const EmployeeLogin = () => {
  const alert = useAlert();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  let navigate=useNavigate()
  if(user !==null){
    navigate("/bankform")
  }
  const dispatch = useDispatch();
  const [employeeData, setEmployeeData] = useState({
    username: "",
    userpwd: "",
  });
  const Input_Handler = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };
  const Submittion = (e) => {
    e.preventDefault();
    setEmployeeData(employeeData);
    console.log(employeeData);
    try {
      dispatch(emplyelogin(employeeData.username, employeeData.userpwd));
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);
  function myFunction() {
    var x = document.getElementById("floatingPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  return (
    <>
      {" "}
      <div className={`employlogintop `}>
        <div className={`employlogin `}>
          {/* <nav class="navbar container navbar-light ">
            <a class="navbar-brand" href="/">
              <img src={logo} alt="loading" width="50%" height="50%" />
            </a>
          </nav> */}
        <div className="emply">
        <div className="cont">
          
          </div>
          <div className="container">
            <div className="contentAdmin">
              <h4>Employee Login</h4>
              <form action="" onSubmit={Submittion}>
                <div className="flexbox">
                  <h5>User name</h5>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter user name"
                    onChange={Input_Handler}
                    value={employeeData.username}
                  />
                </div>
                <div className="flexbox">
                  <h5>Password</h5>
                  <label htmlFor="floatingPassword" style={{ display: "flex" }}>
                    <input
                      type="password"
                      name="userpwd"
                      id="floatingPassword"
                      placeholder="Enter password"
                      onChange={Input_Handler}
                      value={employeeData.userpwd}
                    />
                    <i
                      className="fa fa-eye"
                      style={{ margin: "20px -31px" }}
                      onClick={myFunction}
                    ></i>
                  </label>
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
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
