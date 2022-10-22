import React, { useEffect, useState } from "react";
import { SideNavigation } from "./SideNavigation";
import "./AddList.css";
import axios from "axios";
import { Header } from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { LOader } from "./LOader";
import { useAlert } from "react-alert";
import { clearErrors, logout, uploadsheet } from "../action/useraction";

export const AddList = () => {
  const [selectedfile, setselectedfile] = useState();
  const { user, isAuthenticated, error, loading, success, isUpdated } =
    useSelector((state) => state.user);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  if (isAuthenticated === false) {
    navigate("/");
  }
 
  useEffect(() => {
    if(user){
    if (user.role === "user") {
      dispatch(logout());
      navigate("/employeelogin");
    }

    }
    else{navigate("/")}
    if (isUpdated === false) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success(success);
      dispatch(clearErrors());
    }
  }, [success, error,alert,dispatch,isUpdated,navigate,user]);
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      console.log(selectedfile);
      formdata.append("xlsx", selectedfile);
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      dispatch(uploadsheet(formdata));
    } catch (error) {
      alert.error(error);
      dispatch(clearErrors());
      console.log(error);
    }
  };
  console.log(loading);
  return (
    <>

      <div className="addlisttop">
      <div className="addlistborder">
          <SideNavigation />
        <div className="AddFlex">
        
          <Header />
        {loading  ? (
          <LOader />
          ) : (
            <>
              <form className="addlistform"
                
                onSubmit={handlesubmit}
                action=""
              >
                <span class="btn btn-primary btn-file">
                  Browse...
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={(e) => setselectedfile(e.target.files[0])}
                  />
                </span>

                <input
                  type="submit"
                  style={{ color: "white", backgroundColor: "#3689EB" }}
                  value="Upload"
                  className="btn"
                />
              </form>
          </>
        )}
        </div>
      </div>
    </div>
    </>
  );
};
