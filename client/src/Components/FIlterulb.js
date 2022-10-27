import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logout } from "../action/useraction";
import { Header } from "./Header";
import { LOader } from "./LOader";
import { SideNavigation } from "./SideNavigation";

export const FIlterulb = () => {
  const { loading, filedata } = useSelector((state) => state.apidata);
  const { user, isAuthenticated, error,  success, isUpdated } =
  useSelector((state) => state.user);
  const [year, setYear] = useState();
  const dispatch=useDispatch
  const navigate=useNavigate()
  const [data, setData] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const { district } = useParams();
  console.log(district);
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
  const searchdistrict = async (e) => {
    const res = await axios.post("/api/auth/searchall", {
      "Name of the District": district,
    });
    console.log(res.data);
    console.log(res.data.length);

    setfilterdata(res.data);
  };
  useEffect(() => {
    searchdistrict();
  }, []);
  const getUniqueBy = (arr, prop) => {
    const set = new Set();
    return arr.filter((o) => !set.has(o[prop]) && set.add(o[prop]));
  };
  const fmap = () => {
    try {
      // console.log(data);
      const ffmap = getUniqueBy(filterdata, "Name of Ulb").map((row, index) => {
        console.log(row["Name of Ulb"]);
        return (
          <tr>
             <td>{index+1}</td>
            <Link to={row["Name of Ulb"]}>
              <td>{row["Name of Ulb"]}</td>
            </Link>
            <td>{loanobj[row["Name of Ulb"]]}</td>
            <td>{obj[row["Name of Ulb"]]}</td> 
            <td>{loanobj[row["Name of Ulb"]]-obj[row["Name of Ulb"]]}</td>

          </tr>
        );
      });
      return ffmap;
    } catch (error) {
      console.log(error);
    }
  };
  let loanobj = {};

  filedata.forEach((item) => {
    //console.log(loanobj[item.name]) this return as undefined
    if (!loanobj[item["Name of the ULB"]]) {
      loanobj[item["Name of the ULB"]] = 1;
    } else {
      loanobj[item["Name of the ULB"]] += 1;
    }
  });

  console.log(loanobj);

  let obj = {};
  filterdata.forEach((item) => {
    //console.log(obj[item.name]) this return as undefined
    if (!obj[item["Name of Ulb"]]) {
      obj[item["Name of Ulb"]] = 1;
    } else {
      obj[item["Name of Ulb"]] += 1;
    }
  });
  console.log(obj);
  const searchdis = async (event) => {
    console.log(event.target.value);
    const res = await axios.post("/api/auth/searchall", {
      "Name of the District": district,
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
        <div style={{ width: "70%", marginLeft: "30%", }}>
          <div style={{ width: "50%" }}>
            <div className="breadcum">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <Link to="/filter">
                    <li class="breadcrumb-item active" aria-current="page">
                      Home
                    </li>
                  </Link>
                  /
                  <li class="breadcrumb-item active" aria-current="page">
                    {district}
                  </li>
                </ol>
              </nav>
            </div>
            <div style={{ overflow: "scroll" ,overflowY:"hidden"}} className="table-responsive">
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
              <table className="table" responsive="true">
                <thead>
                  <tr>
                    <th> S No </th>
                    <th>Name of ULB</th>
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
