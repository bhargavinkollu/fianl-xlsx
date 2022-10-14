import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "./Header";
import { SideNavigation } from "./SideNavigation";

export const Filterslf = () => {
  const { tlfname, district, ulb } = useParams();
  console.log(tlfname);
  const [data, setData] = useState([]);
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

  const fmap = () => {
    try {
      // console.log(data);
      const ffmap = getUniqueBy(filterdata, "SLF_NAME").map((row, index) => {
        console.log(row.SLF_NAME);
        return (
          // {Object}.key(filterdata[0]),
          <tr>
            <Link to={row.SLF_NAME}>
              <td>{row.SLF_NAME}</td>
            </Link>
          </tr>
        );
      });
      return ffmap;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <SideNavigation />
      <div className="AddFlex">
        <div style={{ width: "70%", marginLeft: "23%", marginTop: "10%" }}>
          <div style={{ width: "40%" }}>
            {filterdata.length >= 1 ? (
              <>
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
                  </Link>/
                  <Link to={`/filter/${district}/${ulb}`}>
                  <li class="breadcrumb-item active" aria-current="page">
                    {ulb}
                  </li>
                  </Link >/
                  
                  <li class="breadcrumb-item active" aria-current="page">
                    {tlfname}
                  </li>
                  
                </ol>
              </div>
                <div
                  style={{ overflow: "scroll" }}
                  className="table-responsive"
                >
                  <table className="table" responsive="true">
                    <thead>
                      <tr>
                        <td>SLF_NAME</td>
                      </tr>
                    </thead>
                    <tbody>{fmap()}</tbody>
                  </table>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
