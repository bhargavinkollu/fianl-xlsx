import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loaduser, logout } from "../action/useraction";

export const Header = () => {
    const dispatch =useDispatch()
    const navigate = useNavigate();
    const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
    const { user, isAuthenticated, loading} = useSelector((state) =>state.user);
    useEffect(()=>{
  
      dispatch(loaduser())
  
    },[])

    const logoutUser=()=>{
        dispatch(logout());
        navigate("/");
      }
  return <div style={{position:"absolute", right:"40px"}}>  <span className="home_btn">
  {isAuthenticated ===true? (<><div>
    <ul className="navbar-nav top-btn ml-auto">

<button style = {{}} className="user_btn">{uppercaseWords(user.email)}</button>
    
   <a ><button onClick={logoutUser} className='btn btn-2'>Logout</button>  </a>
   </ul></div>
    </>): (
     ""
    )
  }
</span></div>
}
