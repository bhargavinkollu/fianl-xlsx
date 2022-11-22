import "./App.css";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import { useEffect, useState } from "react";

import { AdminLogin } from "./Components/AdminLogin";
import { useDispatch, useSelector } from "react-redux";
import { AddList } from "./Components/AddList";
import { loaduser, logout } from "./action/useraction";
import { Viewlist } from "./Components/Viewlist";
import { BankForm } from "./Components/BankForm";
import { EmployeeLogin } from "./Components/EmployeeLogin";
import { apidata } from "./action/apiaction";
import { Register } from "./Components/Register";
import { Checkgrade } from "./Components/Checkgrade";
import { Filtersdistrict } from "./Components/Filtersdistrict";
import { FIlterulb } from "./Components/FIlterulb";
import { Filtertlf } from "./Components/Filtertlf";
import { Filterslf } from "./Components/Filterslf";
import { Filtershg } from "./Components/Filtershg";
import { Registeradmin } from "./Components/Registeradmin";

function App() {
  const dispatch = useDispatch();
  dispatch(loaduser());

  dispatch(apidata());

  return (
    <div>
      {/* <Upload/> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protectedrouteadmin>
                <AdminLogin />
              </Protectedrouteadmin>
            }
          />
          <Route path="/adminregister" element={<Protectedrouteadmin><Registeradmin /></Protectedrouteadmin>} />
          <Route path="/addlist" element={<AddList />} />
          <Route path="/viewlist" element={<Viewlist />} />
          <Route path="/bankform" element={<BankForm />} />
          <Route path="/employeeregister" element={<Protectedrouteuser><Register /></Protectedrouteuser>} />
          <Route
            path="/employeelogin"
            element={
              <Protectedrouteuser>
                <EmployeeLogin />
              </Protectedrouteuser>
            }
          />
          {/* <Route path="/filter" element={<Filter/>}/> */}
          <Route path="/checkgrade" element={<Checkgrade />} />
          <Route path="/filter" element={<Filtersdistrict />} />
          <Route path="/filter/:district/:years" element={<FIlterulb />} />
          <Route path="/filter/:district/:ulb/:years" element={<Filtertlf />} />
          <Route
            path="/filter/:district/:ulb/:tlfname/:years"
            element={<Filterslf />}
          />
          <Route
            path="/filter/:district/:ulb/:tlfname/:slf/:years"
            element={<Filtershg />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function Protectedrouteadmin(props) {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/addlist" />;
    } else if (user.role === "user") {
      dispatch(logout());
      return <Navigate to="/employeelogin" />;
    }
  } else {
    return props.children;
  }
}
export function Protectedrouteuser(props) {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  if (user) {
    console.log(user);
    if (user.role === "admin") {
      dispatch(logout());
      return <Navigate to="/employeelogin" />;
    } else if (user.role === "user") {
      return <Navigate to="/bankform" />;
    }
  } else {
    return props.children;
  }
}
export function Protectedadmin(props) {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  if (user) {
    if (user.role === "user") {
      dispatch(logout());

      return <Navigate to="/employeelogin" />;
    }
  } else {
    return props.children;
  }
}
