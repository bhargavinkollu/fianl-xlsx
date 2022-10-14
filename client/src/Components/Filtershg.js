import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "./Header";
import { SideNavigation } from "./SideNavigation";

export const Filtershg = () => {
  const [data, setData] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const { slf } = useParams();
  console.log(slf);
  const api = async () => {
    const res = await axios.get("http://localhost:5000/api/auth/searchall");
    setData(res.data);
  };
  const searchdistrict = async (e) => {
    const res = await axios.post("/api/auth/searchall", { SLF_NAME: slf });
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
  return (
    <div>
      <Header />
      <SideNavigation />
      <div className="AddFlex">
        <div style={{ width: "70%", marginLeft: "23%", marginTop: "10%" }}>
          <div style={{ width: "100%"}}>
            {filterdata.length >= 1 ? (
              <>
                <div
                  style={{ overflow: "scroll" }}
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
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
