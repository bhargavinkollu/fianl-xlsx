import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logout } from "../action/useraction";
import { Header } from "./Header";
import { LOader } from "./LOader";
import { SideNavigation } from "./SideNavigation";

export const Filterslf = () => {
  const { loading, filedata } = useSelector((state) => state.apidata);

  const { tlfname, district, ulb } = useParams();
  console.log(tlfname);
  const [data, setData] = useState([]);
  const [year, setYear] = useState("");
  const dispatch=useDispatch
  const navigate=useNavigate()
  const { user, isAuthenticated, error,  success, isUpdated } =
  useSelector((state) => state.user);
 useEffect(() => {
  if (user) {
    if (user.role === "user") {
      dispatch(logout());
      navigate("/employeelogin");
    }
    } else  {
      navigate("/");
    }
  }, [dispatch, isAuthenticated, navigate, user])
  const [filterdata, setfilterdata] = useState([]);

  const getUniqueBy = (arr, prop) => {
    const set = new Set();
    return arr.filter((o) => !set.has(o[prop]) && set.add(o[prop]));
  };

  const searchdistrict = async (e) => {
    const res = await axios.post("/api/auth/searchall", { TLF_NAME: tlfname });
    console.log(res.data);
    setfilterdata(res.data);
  };
  useEffect(() => {
    searchdistrict();
  }, []);
  let obj = {};
  filterdata.forEach((item) => {
    //console.log(obj[item.name]) this return as undefined
    if (!obj[item.SLF_NAME]) {
      obj[item.SLF_NAME] = 1;
    } else {
      obj[item.SLF_NAME] += 1;
    }
  });
  console.log(obj);
  let loanobj = {};

  filedata.forEach((item) => {
    //console.log(loanobj[item.name]) this return as undefined
    if (!loanobj[item["SLF Name"]]) {
      loanobj[item["SLF Name"]] = 1;
    } else {
      loanobj[item["SLF Name"]] += 1;
    }
  });

  console.log(loanobj);
  const fmap = () => {
    try {
      console.log(year);
      const ffmap = getUniqueBy(filterdata, "SLF_NAME").map(
        (row, index) => {
          console.log(obj[row]);
          console.log(row.SLF_NAME);
          return (
            // {Object}.key(filterdata[0]),
            <tr>
              <Link to={row.SLF_NAME}>
                <td>{row.SLF_NAME}</td>
              </Link>
              <td>{obj[row.SLF_NAME]}</td>
              <td>{loanobj[row.SLF_NAME]}</td>
            </tr>
          );
        }
      );
      return ffmap;
    } 
    catch (error) {
      console.log(error);
    }
  };
  const searchdis = async (event) => {
    console.log(event.target.value);
    const res = await axios.post("/api/auth/searchall", {
      TLF_NAME: tlfname,
      year: event.target.value,
    });
    console.log(res.data);
    setfilterdata(res.data);
  };

  return (
    <div className="viewlisttop">
    <div className="viewlistboarder">
      <SideNavigation />
      <Header />
      <div className="AddFlex">
        <div style={{ width: "70%", marginLeft: "30%" }}>
          <div style={{ width: "50%" }}>
            <div className="breadcum">
              <ol class="breadcrumb">
                <Link to="/filter">
                  <li class="breadcrumb-item active" aria-current="page">
                    Home
                  </li>
                </Link>
                /
                <Link to={`/filter/${district}`}>
                  <li class="breadcrumb-item active" aria-current="page">
                    {district}
                  </li>
                </Link>
                /
                <Link to={`/filter/${district}/${ulb}`}>
                  <li class="breadcrumb-item active" aria-current="page">
                    {ulb}
                  </li>
                </Link>
                /
                <li class="breadcrumb-item active" aria-current="page">
                  {tlfname}
                </li>
              </ol>
            </div>
            <select required onChange={searchdis}>
              <option selected disabled value="">
                year
              </option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
              <option>2027</option>
              <option>2028</option>
              <option>2029</option>
              <option>2030</option>
            </select>
            <div style={{ overflow: "scroll",overflowY:"hidden" ,overflowY:"hidden"}} className="table-responsive">
              <table className="table" responsive="true">
                <thead>
                  <tr>
                    <td>SLF_NAME</td>
                    <td>Count</td>
                    <td>Count</td>
                  </tr>
                </thead>
                {loading ?(<LOader/>):(
                filterdata.length >= 1 ? (
                  <>
                    <tbody>{fmap()}</tbody>
                  </>
                ) : (
                  "no data found"
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
