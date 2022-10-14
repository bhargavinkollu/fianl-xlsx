import React, { useEffect, useState } from "react";
import "./AdminLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../action/useraction";
import { useAlert } from "react-alert";
import { LOader } from "./LOader";

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
        <div className="container">
          <div className="contentAdmin">
            <h3>Admin Login</h3>
            <form action="" onSubmit={Submittion}>
              <div className="flexboxA  mb-3">
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
              <div className="flexboxA  mb-3">
                <h5>Password</h5>
                <input
                  type="password"
                  id="floatingPassword"
                  name="userpwd"
                  onChange={Input_Handler}
                  className="form-control"
                  value={adminData.userpwd}
                />

                <i
                  className="fa fa-eye"
                  style={{margin:"20px -31px"}}
                  onClick={myFunction}
                ></i>
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
      )}
    </>
  );
};
