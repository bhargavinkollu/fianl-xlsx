import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import { SideNavigation } from "./SideNavigation";

export const Filtersdistrict = () => {
  const { loading, filedata } = useSelector((state) => state.apidata);
  const [year, setYear] = useState("");

  const [data, setData] = useState([]);
  const [filterdata, setfilterdata] = useState([]);

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
    if (!obj[item.Name_of_the_District]) {
      obj[item.Name_of_the_District] = 1;
    } else {
      obj[item.Name_of_the_District] += 1;
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
    console.log(getUniqueBy(filterdata, "Name_of_the_District"));
    try {
      console.log(year);
      const ffmap = getUniqueBy(filterdata, "Name_of_the_District").map(
        (row, index) => {
          console.log(obj[row]);
          console.log(row.Name_of_the_District);
          return (
            // {Object}.key(filterdata[0]),
            <tr>
              <Link to={row.Name_of_the_District}>
                <td>{row.Name_of_the_District}</td>
              </Link>
              <td>{obj[row.Name_of_the_District]}</td>
              <td>{loanobj[row.Name_of_the_District]}</td>
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
            <div style={{ overflow: "scroll",overflowY:"hidden" }} className="table-responsive">
              <table className="table" responsive="true">
                <thead>
                  <tr>
                    <th>Name_of_the_District</th>
                    <th>Count</th>
                    <th>total Count</th>
                  </tr>
                </thead>
                {filterdata.length >= 1 ? (
                  <>
                    <tbody>{fmap()}</tbody>
                  </>
                ) : (
                  "No data found "
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
