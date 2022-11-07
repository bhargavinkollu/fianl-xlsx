import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../action/useraction";
import { Header } from "./Header";
import { LOader } from "./LOader";
import { SideNavigation } from "./SideNavigation";

export const Filtersdistrict = () => {
  const { loading, filedata } = useSelector((state) => state.apidata);
  const [year, setYear] = useState("");
  
  
  const [data, setData] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const { user, isAuthenticated, error,  success, isUpdated } =
  useSelector((state) => state.user);
  const dispatch=useDispatch
  const navigate=useNavigate()
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
  const api = async () => {
    const res = await axios.get("/api/auth/searchall");
    setData(res.data);
  };

  const searchdistrict = async (e) => {
    const res = await axios.post("/api/auth/getxlsxfile");
    setfilterdata(res.data);
    // console.log(res.data.length);
  };
  const [uploadcount, setUploadcount] = useState([]);
  const searchdistrictcount = async (e) => {
    const res = await axios.post("/api/auth/searchall");
    setUploadcount(res.data);
    // console.log(res.data.length);
  };
  let obj = {};

  uploadcount.forEach((item) => {
    //console.log(obj[item.name]) this return as undefined
    if (!obj[item["District"]]) {
      obj[item["District"]] = 1;
    } else {
      obj[item["District"]] += 1;
    }
  });
  useEffect(() => {
    api();
    searchdistrict();
    searchdistrictcount()
  }, []);


  // console.log(obj);
  let loanobj = {};
  const searchdis = async (event) => {
    // console.log(event.target.value);
    const res = await axios.post("/api/auth/getxlsxfile", {
      year: event.target.value,
    });
    // console.log(res.data);
    setfilterdata(res.data);
  };

  filedata.forEach((item) => {
    // console.log(item);
    //console.log(loanobj[item.name]) this return as undefined
    if (!loanobj[item["District"]]) {
      loanobj[item["District"]] = 1;
    } else {
      loanobj[item["District"]] += 1;
    }
  });
let Districtaa=""
  filedata.forEach((item) => {
    Districtaa=item["District"];
    //console.log(loanobj[item.name]) this return as undefined
   
  });
// console.log(Districtaa);
  // console.log(loanobj);

  // console.log(filterdata);

  const fmap = () => {
    // console.log(filterdata.length);
    const getUniqueBy = (arr, prop) => {
      const set = new Set();
      return filedata.filter((o) => !set.has(o[prop]) && set.add(o[prop]));
    };
    // console.log(getUniqueBy(filterdata, "District"));
    try {
      // console.log(year);
      const ffmap = getUniqueBy(filterdata, "District").map(
        (row, index) => {
          // console.log(obj[row["District"]]);
          // console.log(loanobj[row["District"]]);
          // console.log(row);
          if(obj[row["District"]]=== undefined){
            obj[row["District"]]=0
          }
          return (  
            // {Object}.key(filterdata[0]),
            <tr>
              <td>{index+1}</td>
              <Link to={row["District"]}>
                <td>{row["District"]}</td>
              </Link>
              <td>{loanobj[row["District"]]}</td>
              <td>{obj[row["District"]]}</td>
              <td>{loanobj[row["District"]]-obj[row["District"]]}</td>
            </tr>
          );
        }
      );
      return ffmap;
    } catch (error) {
      console.log(error);
    }
  };
  const nsns=new Date ().getFullYear().toString()

  function getCurrentFinancialYear() {
    var financial_year = "";
    var today = new Date();
    if ((today.getMonth() + 1) <= 3) {
        financial_year = (new Date ().getFullYear() - 1).toString().slice(2) + "-" + today.getFullYear()
    } else {
        financial_year = nsns+ "-" + (today.getFullYear() + 1).toString().slice(2) 
    }
    return financial_year;
}
  return (
    <div className="viewlisttop">
    <div className="viewlistboarder">
      <SideNavigation />
      <Header />
      <div className="AddFlex">
        <div style={{ width: "70%", marginLeft: "30%" }}>
          <div style={{ width: "50%" }}>
            <div className="breadcum">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <Link to="/filter">
                    <li class="breadcrumb-item active" aria-current="page">
                      Home
                    </li>
                  </Link>
                </ol>
              </nav>
            </div>
            <label>Financial Year:</label>
            <select required onChange={searchdis}>
            <option selected  value={getCurrentFinancialYear()}>
                      Current year
                    </option>
                      
                    <option value="2020-21">2020-21</option>
                    <option value="2021-22">2021-22</option>
                    <option value="2022-23">2022-23</option>
                    <option value="2023-24">2023-24</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2025-26">2025-26</option>
                    <option value="2026-27">2026-27</option>
                    <option value="2027-28">2027-28</option>
                    <option value="2028-29">2028-29</option>
                    <option value="2029-30">2029-30</option>
                    <option value="2030-31">2030-31</option>
            </select>
            <div style={{ overflow: "scroll",overflowY:"hidden" }} className="table-responsive">
              <table className="table" responsive="true">
                <thead>
                  <tr>
                    <th> S No </th>
                    <th>District</th>
                    <th>Total SHGs</th>
                    <th>Uploaded SHGs</th>
                    <th>Balance SHGs </th>
                  </tr>
                </thead>
                {loading ?(<LOader/>):(
                filterdata.length >= 1 ? (
                  <>
                    <tbody>{fmap()}</tbody>
                  </>
                ) : (
                  "No data found "
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
