import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "./Header";
import { SideNavigation } from "./SideNavigation";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../action/useraction";
import { LOader } from "./LOader";
export const Filtershg = () => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState();
  console.log(year);
  const dispatch=useDispatch
  const navigate=useNavigate()
  const { user, isAuthenticated, error, loading, success, isUpdated } =
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
  const { slf, district, ulb, tlfname } = useParams();
  console.log(slf);
  const api = async () => {
    const res = await axios.get("http://localhost:5000/api/auth/searchall");
    setData(res.data);
  };
  const searchdistrict = async (event) => {
    const res = await axios.post("/api/auth/searchall", {
      "SLF NAME": slf,
      year,
    });
    console.log(res.data);
    setfilterdata(res.data);
  };
  const searchdis = async (event) => {
    console.log(event.target.value);
    const res = await axios.post("/api/auth/searchall", {
      "SLF NAME": slf,
      year:event.target.value,
    });
    console.log(res.data);
    setfilterdata(res.data);
  };
  useEffect(() => {
    api();
    searchdistrict();
  }, []);

  const fmap = () => {
    try {
      // console.log(data);
      const ffmap = filterdata.map((row, index) => {
        // console.log(row["SHG ID"]);
        return (
          // {Object}.key(filterdata[0]),
          <tr>
            {Object.keys(filterdata[0]).map((key, index) => {
              // console.log(row["SHG ID"]);
              const rooo = Object.keys(filterdata[0]).filter((item, index) => {
                // console. log(item);
              });
              return <td>{row[key]}</td>;
            })}
          </tr>
        );
      });
      return ffmap;
    } catch (error) {
      console.log(error);
    }
  };
  const hmap = () => {
    try {
      const hhmap = Object.keys(filterdata[0]).map((heading) => {
        // console.log(heading);
        return <th>{heading}</th>;
      });
      return hhmap;
    } catch (error) {
      console.log(error);
    }
  };
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filterdata);
    console.log(ws);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "excel" + fileExtension);
  };
  return (
    <div className="viewlisttop">
    <div className="viewlistboarder">
      <SideNavigation />
      <Header />
      <div className="AddFlex">
        <div style={{ width: "70%", marginLeft: "30%"}}>
          <div style={{ width: "100%" }}>
            <button className="btn" onClick={downloadExcel}>
              <i class="fa fa-download" aria-hidden="true"></i>
            </button>
          
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
                    <Link to={`/filter/${district}/${ulb}/${tlfname}`}>
                      <li class="breadcrumb-item active" aria-current="page">
                        {tlfname}
                      </li>
                    </Link>
                    /
                    <li class="breadcrumb-item active" aria-current="page">
                      {slf}
                    </li>
                  </ol>
                  <select className="form-select-bg"required onChange={searchdis}>
              <option selected disabled value="">
                year
              </option>
              <option value="2020">2020-21</option>
              <option value="2021">2021-22</option>
              <option value="2022">2022-23</option>
              <option value="2023">2023-24</option>
              <option value="2024">2024-25</option>
              <option value="2025">2025-26</option>
              <option value="2026">2026-27</option>
              <option value="2027">2027-28</option>
              <option value="2028">2028-29</option>
              <option value="2029">2029-30</option>
              <option value="2030">2030-31</option>
            </select>
                </div>
                {loading ?(<LOader/>):(
                   
                   filterdata.length >= 1 ? (
                    <>
                    <div
                  style={{ overflow: "scroll" ,overflowY:"hidden"}}
                  className="table-responsive"
                >
                  <table className="table" responsive="true">
                    <thead>
                      <tr>{hmap()}</tr>
                    </thead>
                    <tbody>{fmap()}</tbody>
                  </table>
                </div>
              </>
            ) : (
              "no data found"
              )
                )                }
                 
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
