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
    <div 
    style={{ position: "relative", top: "-40px" ,width:"120%"}
    }
    >
      {" "}
      <span className="home_btn">
        {isAuthenticated === true ? (
          <>
            <div className="headertop">
              <ul className="navbar-nav top-btn flex-row ml-auto">
               Welcome: <span style={{}} className="user_btn">
                  {uppercaseWords(user.email)}
                </span>

              </ul>
                <a>
                  <button onClick={logoutUser} className="btn btn-2">
                    Logout
                  </button>{" "}
                </a>
            </div>
          </>
        ) : (
          ""
        )}
      </span>
    </div>
  );
};
