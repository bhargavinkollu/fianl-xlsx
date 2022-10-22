import React, { useEffect, useState } from "react";
import "./AdminLogin.css";
import "./Adminloginsecond.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../action/useraction";
import { useAlert } from "react-alert";
import { LOader } from "./LOader";
import logo from "../Image/adminloginlogo.png"
export const AdminLogin = () => {
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
      dispatch(login(adminData.username, adminData.userpwd));
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error(error);
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
      {loading ? (
        <LOader />
      ) : (
      <div className ={ `adminlogintop `} >
      <div className ={ `adminlogin `} >
        <nav class="navbar container navbar-light ">
  <a class="navbar-brand" href="/"><img src={logo} alt="loading" width="50%" height="50%"/></a>
</nav>
          <div className="">
          <div className="contentAdmin">
            <h4 style={{paddingTop:"10%"}}>Login to your account</h4>
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
                <label htmlFor="floatingPassword" style={{display:"flex"}}>

                <input
                  type="password"
                  id="floatingPassword"
                  name="userpwd"
                  onChange={Input_Handler}
                  className="form-control"
                  value={adminData.userpwd}
                  />

                <i id="floatingPassword"
                  className="fa fa-eye"
                  style={{margin:"20px -31px"}}
                  onClick={myFunction}
                  ></i>
                  </label>
              </div>
              <div className="buton">
              </div>
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
      </div>
      )}
    </>
  );
};