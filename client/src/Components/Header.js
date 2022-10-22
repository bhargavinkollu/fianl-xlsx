import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loaduser, logout } from "../action/useraction";
import "./header.css"

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uppercaseWords = (str) =>
    str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(loaduser());
  }, []);

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div>
      {" "}
      <span className="home_btn">
        {isAuthenticated === true ? (
          <>
            <div className="headertop">
              <ul className="navbar-nav top-btn flex-row ">
               Welcome: <span style={{fontWeight:"bolder",marginRight:"11px"}} className="user_btn">
                  {uppercaseWords(user.email)}
                </span>

              </ul>
               
                  <button onClick={logoutUser} className="btn  mr-2 btn-2">
                    Logout
                  </button>{" "}
               
            </div>
          </>
        ) : (
          ""
        )}
      </span>
    </div>
  );
};
