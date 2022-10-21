import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Header } from "./Header";
import { SideNavigation } from "./SideNavigation";

export const FIlterulb = () => {
  const { loading, filedata } = useSelector((state) => state.apidata);
  const [year, setYear] = useState();

  const [data, setData] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const { district } = useParams();
  console.log(district);

  const searchdistrict = async (e) => {
    const res = await axios.post("/api/auth/searchall", {
      Name_of_the_District: district,
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
      const ffmap = getUniqueBy(filterdata, "Name_of_ulb").map((row, index) => {
        console.log(row.Name_of_ulb);
        return (
          <tr>
            <Link to={row.Name_of_ulb}>
              <td>{row.Name_of_ulb}</td>
            </Link>
            <td>{obj[row.Name_of_ulb]}</td>
            <td>{loanobj[row.Name_of_ulb]}</td>
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
    if (!obj[item.Name_of_ulb]) {
      obj[item.Name_of_ulb] = 1;
    } else {
      obj[item.Name_of_ulb] += 1;
    }
  });
  console.log(obj);
  const searchdis = async (event) => {
    console.log(event.target.value);
    const res = await axios.post("/api/auth/searchall", {
      Name_of_the_District: district,
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
        <div style={{ width: "70%", marginLeft: "30%", marginTop: "10%" }}>
          <div style={{ width: "40%" }}>
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
            <div style={{ overflow: "scroll" }} className="table-responsive">
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
                    <td>Name_of_ulb</td>
                    <td>Count</td>
                    <td>Total Count</td>
                  </tr>
                </thead>
                {filterdata.length >= 1 ? (
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
