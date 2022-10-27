import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logout } from "./action/useraction";
import { Header } from "./Components/Header";
import { LOader } from "./Components/LOader";
import { SideNavigation } from "./Components/SideNavigation";
export const Filtertlf = () => {
  const { loading, filedata } = useSelector((state) => state.apidata);
  const dispatch = useDispatch;
  const navigate = useNavigate();
  const { user, isAuthenticated, error, success, isUpdated } = useSelector(
    (state) => state.user
  );
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
  const { ulb, district } = useParams();
  console.log(ulb);
  const getUniqueBy = (arr, prop) => {
    const set = new Set();
    return arr.filter((o) => !set.has(o[prop]) && set.add(o[prop]));
  };

  const [year, setYear] = useState("");

  const [data, setData] = useState([]);
  const [filterdata, setfilterdata] = useState([]);

  const searchdistrict = async (e) => {
    const res = await axios.post("/api/auth/searchall", { "Name of Ulb": ulb });
    console.log(res.data);
    setfilterdata(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    searchdistrict();
  }, []);
  let obj = {};

  filterdata.forEach((item) => {
    if (!obj[item["TLF NAME"]]) {
      obj[item["TLF NAME"]] = 1;
    } else {
      obj[item["TLF NAME"]] += 1;
    }
  });

  console.log(obj);
  let loanobj = {};

  filedata.forEach((item) => {
    //console.log(loanobj[item.name]) this return as undefined
    if (!loanobj[item["TLF Name"]]) {
      loanobj[item["TLF Name"]] = 1;
    } else {
      loanobj[item["TLF Name"]] += 1;
    }
  });

  console.log(loanobj);

  console.log(filterdata);
  const fmap = () => {
    try {
      const ffmap = getUniqueBy(filterdata, "TLF NAME").map((row, index) => {
        console.log(obj[row]);
        console.log(row["TLF NAME"]);
        return (
          // {Object}.key(filterdata[0]),
          <tr>
            <td>{index + 1}</td>

            <Link to={row["TLF NAME"]}>
              <td>{row["TLF NAME"]}</td>
            </Link>
            <td>{loanobj[row["TLF NAME"]]}</td>
            <td>{obj[row["TLF NAME"]]}</td>
            <td>{loanobj[row["TLF NAME"]] - obj[row["TLF NAME"]]}</td>
          </tr>
        );
      });
      return ffmap;
    } catch (error) {
      console.log(error);
    }
  };

  const searchdis = async (event) => {
    console.log(event.target.value);
    const res = await axios.post("/api/auth/searchall", {
      "Name of Ulb": ulb,
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
                  <li class="breadcrumb-item active" aria-current="page">
                    {ulb}
                  </li>
                </ol>
              </div>
              <div
                style={{ overflow: "scroll", overflowY: "hidden" }}
                className="table-responsive"
              >
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
                <table className="table" responsive="true">
                  <thead>
                    <tr>
                      <th> S No </th>
                      <td>TLF NAME</td>
                      <th>Total SHGs</th>
                      <th>Uploaded SHGs</th>
                      <th>Balance SHGs </th>
                    </tr>
                  </thead>
                  {loading ? (
                    <LOader />
                  ) : filterdata.length >= 1 ? (
                    <>
                      <tbody>{fmap()}</tbody>
                    </>
                  ) : (
                    "no data found"
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
