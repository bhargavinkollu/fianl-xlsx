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
    const res = await axios.get("http://localhost:5000/api/auth/searchall");
    setData(res.data);
  };

  const searchdistrict = async (e) => {
    const res = await axios.post("/api/auth/slumidsearch");
    setfilterdata(res.data);
    console.log(res.data.length);
  };
  useEffect(() => {
    api();
    searchdistrict();
  }, []);

  let obj = {};

  filterdata.forEach((item) => {
    //console.log(obj[item.name]) this return as undefined
    if (!obj[item["Name of the District"]]) {
      obj[item["Name of the District"]] = 1;
    } else {
      obj[item["Name of the District"]] += 1;
    }
  });

  console.log(obj);
  let loanobj = {};
  const searchdis = async (event) => {
    console.log(event.target.value);
    const res = await axios.post("/api/auth/searchall", {
      year: event.target.value,
    });
    console.log(res.data);
    setfilterdata(res.data);
  };

  filedata.forEach((item) => {
    //console.log(loanobj[item.name]) this return as undefined
    if (!loanobj[item["Name of the District"]]) {
      loanobj[item["Name of the District"]] = 1;
    } else {
      loanobj[item["Name of the District"]] += 1;
    }
  });

  console.log(loanobj);

  console.log(filterdata);

  const fmap = () => {
    console.log(filterdata.length);
    const getUniqueBy = (arr, prop) => {
      const set = new Set();
      return arr.filter((o) => !set.has(o[prop]) && set.add(o[prop]));
    };
    console.log(getUniqueBy(filterdata, "Name of the District"));
    try {
      console.log(year);
      const ffmap = getUniqueBy(filterdata, "Name of the District").map(
        (row, index) => {
          console.log(obj[row["Name of the District"]]);
          console.log(loanobj[row["Name of the District"]]);
          console.log(row['Name of the District']);
          return (  
            // {Object}.key(filterdata[0]),
            <tr>
              <td>{index+1}</td>
              <Link to={row["Name of the District"]}>
                <td>{row["Name of the District"]}</td>
              </Link>
              <td>{loanobj[row["Name of the District"]]}</td>
              <td>{obj[row["Name of the District"]]}</td>
              <td>{loanobj[row["Name of the District"]]-obj[row["Name of the District"]]}</td>
            </tr>
          );
        }
      );
      return ffmap;
    } catch (error) {
      console.log(error);
    }
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
            <select required onChange={searchdis}>
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
            <div style={{ overflow: "scroll",overflowY:"hidden" }} className="table-responsive">
              <table className="table" responsive="true">
                <thead>
                  <tr>
                    <th> S No </th>
                    <th>Name of the District</th>
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
