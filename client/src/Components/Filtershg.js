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
  // console.log(year);
  const dispatch = useDispatch;
  const navigate = useNavigate();
  const { user, isAuthenticated, error, loading, success, isUpdated } =
    useSelector((state) => state.user);
  const [newloading, setnewloading] = useState(false);
  const [notuploaded, setNotuploaded] = useState();
  

  useEffect(() => {
    if (user) {
      if (user.role === "user") {
        dispatch(logout());
        navigate("/employeelogin");
      }
    } else {
      navigate("/");
    }
  }, [dispatch, isAuthenticated, navigate, user]);
  const [filterdata, setfilterdata] = useState([]);
  const { slf, district, ulb, tlfname } = useParams();
  // console.log(slf);
  const api = async () => {
    const res = await axios.get("/api/auth/searchall");
    setData(res.data);
  };
  const searchdistrict = async (year) => {
    if (year === undefined) {
      year = getCurrentFinancialYear();
    }
    setnewloading(true);
    const res = await axios
      .post("/api/auth/searchall", {
        "SLF Name": slf,
        year:getCurrentFinancialYear(),
      })
      .then((res) => (setfilterdata(res.data), setnewloading(false)));

    // console.log(res.data);
    // setfilterdata(res.data);
  };
  const searchdis = async (event) => {
    // console.log(event.target.value);
    let year;
    if (event) {
      year = event.target.value;
    } else if (!event) {
      year = getCurrentFinancialYear();
    }
    const res = await axios.post("/api/auth/searchall", {
      "SLF Name": slf,
      year: year
    });
    // console.log(res.data);
    setfilterdata(res.data);
  };
  useEffect(() => {
    api();
    searchdistrict();
  }, []);

  const nsns = new Date().getFullYear().toString();
  function getCurrentFinancialYear() {
    var financial_year = "";
    var today = new Date();
    if (today.getMonth() + 1 <= 3) {
      financial_year =
        (new Date().getFullYear() - 1).toString().slice(2) +
        "-" +
        today.getFullYear();
    } else {
      financial_year =
        nsns + "-" + (today.getFullYear() + 1).toString().slice(2);
    }
    return financial_year;
  }
  const fmap = (newdata) => {
    let data;
    if(year===undefined){
      data=filterdata
    }
    else {
      data=newdata
    }
    console.log(newdata);
    try {
      // console.log(data);
      const ffmap = data.map((row, index) => {
        // console.log(row["SHG ID"]);
        return (
          // {Object}.key(filterdata[0]),
          <tr>
            {Object.keys(filterdata[0])
              .filter((item, index) => {
                return item !== "_id";
              })
              .map((key, index) => {
                // console.log(row["SHG ID"]);
                const rooo = Object.keys(filterdata[0]).filter(
                  (item, index) => {
                    // console. log(item);
                  }
                );
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
      const hhmap = Object.keys(filterdata[0])
        .filter((item, index) => {
          return item !== "_id";
        })
        .map((heading) => {
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
    // console.log(ws);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "excel" + fileExtension);
  };
  const notuploadshgid = async () => {
    setnewloading(true);

    const res = await axios
      .post("/api/auth/getxlsxfile", {
        "SLF Name": slf,
      })
      .then((res) => (setNotuploaded(res.data), setnewloading(false)));
    console.log(notuploaded);
    fmap(notuploaded)
  };

  return (
    <div className="viewlisttop">
      <div className="viewlistboarder">
        <SideNavigation />
        <Header />
        <div className="AddFlex">
          <div style={{ width: "70%", marginLeft: "30%" }}>
            <div style={{ width: "100%" }}>
              <button className="btn" onClick={downloadExcel}>
                <i class="fa fa-download" aria-hidden="true"></i>
              </button>

              <div className="breadcum">
                <ol class="breadcrumb">
                  <Link to={`/filter`}>
                    <li class="breadcrumb-item active" aria-current="page">
                      Home
                    </li>
                  </Link>

                  <li class="breadcrumb-item active" aria-current="page">
                    {district}
                  </li>

                  <li class="breadcrumb-item active" aria-current="page">
                    {ulb}
                  </li>

                  <li class="breadcrumb-item active" aria-current="page">
                    {tlfname}
                  </li>

                  <li class="breadcrumb-item active" aria-current="page">
                    {slf}
                  </li>
                </ol>
                <Link to={`/filter/${district}/${ulb}/${tlfname}`}>
                  <li class="breadcrumb-item active" aria-current="page">
                    <button className="btn btn-outline-dark">back</button>
                  </li>
                </Link>
              </div>
              <label>Financial Year:</label>
              <select className="form-select-bg" required onChange={searchdis}>
                <option selected value={getCurrentFinancialYear()}>
                  Current year:
                  <br />
                  {getCurrentFinancialYear()}
                  year
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
            </div>

            <button className="btn btn-primary ml-1" onClick={searchdistrict}>
              {" "}
              Uploaded
            </button>
            <button className="btn btn-primary ml-1" onClick={notuploadshgid}>
              notuploaded
            </button>
            {loading ? (
              <LOader />
            ) : filterdata.length >= 1 ? (
              <>
                {newloading === true ? (
                  <LOader />
                ) : (
                  <div
                    style={{ overflow: "scroll", overflowY: "hidden" }}
                    className="table-responsive"
                  >
                    <table className="table" responsive="true">
                      <thead>
                        <tr>{hmap()}</tr>
                      </thead>
                      <tbody>{fmap()}</tbody>
                    </table>
                  </div>
                )}
              </>
            ) : (
              <>
                <div>
                  {" "}
                  <h1>no data found</h1>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
