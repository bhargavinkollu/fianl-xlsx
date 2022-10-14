import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  Form,
  Card,
  Button,
  Row,
  Col,
  Table,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { Uploadexcle } from "./Components/Uploadexcle";
import { Tabl } from "./Components/Table";
import { Upload } from "./Components/Upload";
import { AdminLogin } from "./Components/AdminLogin";
import { useDispatch, useSelector } from "react-redux";
import { SideNavigation } from "./Components/SideNavigation";
import { AddList } from "./Components/AddList";
import { loaduser, logout } from "./action/useraction";
import { Viewlist } from "./Components/Viewlist";
import { BankForm } from "./Components/BankForm";
import { Header } from "./Components/Header";
import { EmployeeLogin } from "./Components/EmployeeLogin";
import { apidata } from "./action/apiaction";
import { Filter } from "./Components/Filter";
import { Register } from "./Components/Register";
import { Checkgrade } from "./Components/Checkgrade";
import  { Filtersdistrict} from "./Components/Filtersdistrict";
import { FIlterulb } from "./Components/FIlterulb";
import { Filtertlf } from "./Filtertlf";
import { Filterslf } from "./Components/Filterslf";
import { Filtershg } from "./Components/Filtershg";

function App() {
  const dispatch = useDispatch();
  dispatch(loaduser());
dispatch(apidata())

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [objj, setObjj] = useState(null);
  let data = null;

  const getHeadings = () => {
    return Object.keys(data[0]);
  };
  return (
    <div className="containe">
      {/* <Upload/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protectedrouteadmin><AdminLogin /></Protectedrouteadmin>}/>
          <Route path="/addlist" element={<AddList/>}/>
          <Route path="/viewlist" element={<Viewlist/>}/>
          <Route path="/bankform" element={<BankForm/>}/>
          <Route path="/register" element={<Register/>}/>
          {/* <Route path="/filter" element={<Filter/>}/> */}
          <Route path="/checkgrade" element={<Checkgrade/>}/>
          <Route path="/employeelogin" element={<Protectedrouteuser><EmployeeLogin/></Protectedrouteuser>}/>
          <Route path="/filter" element={<Filtersdistrict/>}/>
          <Route path="/filter/:district" element={<FIlterulb/>}/>
          <Route path="/filter/:district/:ulb" element={<Filtertlf/>}/>
          <Route path="/filter/:district/:ulb/:tlfname" element={<Filterslf/>}/>
          <Route path="/filter/:district/:ulb/:slfname/:slf" element={<Filtershg/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function Protectedrouteadmin(props) {
  const dispatch = useDispatch();

  const { user,isAuthenticated } = useSelector((state) => state.user);
  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/addlist" />;
    }
    else if(user.role==="user"){
      dispatch(logout())
      return <Navigate to="/employeelogin" />
    }
  } else {
    return props.children;
  }
}
export function Protectedrouteuser(props) {
  const dispatch = useDispatch();

  const { user,isAuthenticated } = useSelector((state) => state.user);
  if (user) {
    if (user.role === "admin") {
      dispatch(logout())
      return <Navigate to="/employeelogin" />;
    }
    else if(user.role==="user"){
      
      return <Navigate to="/bankform" />
    }
  } else {
    return props.children;
  }
}
export function Protectedadmin(props) {
  const dispatch = useDispatch();

  const { user,isAuthenticated } = useSelector((state) => state.user);
  if (user) {
    if(user.role==="user"){
      dispatch(logout())
      
      return <Navigate to="/employeelogin" />
    }
  } else {
    return props.children;
  }
}

