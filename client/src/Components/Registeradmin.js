import React, { useEffect, useState } from "react";
import "./AdminLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../action/useraction";
import { useAlert } from "react-alert";
import { LOader } from "./LOader";
import axios from "axios";
import logo from "../Image/adminloginlogo.png";
import { useNavigate } from "react-router-dom";

export const Registeradmin = () => {
  const [newloading, setnewloading] = useState(false);

  const alert = useAlert();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate= useNavigate()

  const [adminData, setAdminData] = useState({
    username: "",
    userpwd: "",
  });
  const Input_Handler = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };
  const Submittion = async (e) => {
    e.preventDefault();
    setAdminData(adminData);
    // console.log(adminData);
    // setAdminData({
    //   username: "",
    //   userpwd: "",

    // })
    setnewloading(true);
    
    console.log(adminData);
    try {
      const res = await axios.post("/api/auth/adminregister", {
        email: adminData.username,
        password: adminData.userpwd,
        role: "admin",
      });
      if (res.data.success) {
        alert.success("signup successfully");
      setnewloading(false)
      navigate("/addlist")

      }
    } catch (error) {
      alert.error(error.response.data);
      setnewloading(false)

    }
    // try {

    //  const res=   await axios.post("/api/auth/employregister",{email:adminData.username,password:adminData.userpwd,})
    //  if(res.data.success){
    //   alert.success("signup successfully")
    //  }
    // } catch (error) {
    //     alert.error(error.response.data);
    // }
  };
  useEffect(() => {
    if (error) {
      console.log(error);
      // alert.error(error[message]);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);
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
      {newloading === true ? (
                  <LOader />
                ) : (
      <div className={`adminlogintop `}>
        <div className={`adminlogin `}>
          <nav class="navbar container navbar-light ">
            <a class="navbar-brand" href="/">
              <img src={logo} alt="loading" width="50%" height="50%" />
            </a>
          </nav>
          <div className="">
            <div className="contentAdmin">
              <h4 style={{ paddingTop: "10%" }}>
                Register admin
              </h4>
              <form action="" onSubmit={Submittion}>
                <div className="flexboxA">
                  <h5>User name</h5>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter user name"
                    onChange={Input_Handler}
                    className="form-control"
                    value={adminData.username}
                  />
                </div>
                <div className="flexboxA">
                  <h5>Password</h5>
                  <label htmlFor="floatingPassword" style={{ display: "flex" }}>
                    <input
                      type="password"
                      id="floatingPassword"
                      name="userpwd"
                      onChange={Input_Handler}
                      className="form-control"
                      value={adminData.userpwd}
                    />

                    <i
                      id="floatingPassword"
                      className="fa fa-eye"
                      style={{ margin: "20px -31px" }}
                      onClick={myFunction}
                    ></i>
                  </label>
                </div>
                <div className="buton"></div>
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-success"
                  id="buttonSubmit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>)}
    </>
  );
};
