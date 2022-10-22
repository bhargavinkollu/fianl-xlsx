import React, { useEffect, useState } from "react";
import axios from "axios";

import { SideNavigation } from "./SideNavigation";
import "./checkgrade.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../action/useraction";
import { Header } from "./Header";
export const Checkgrade = () => {
  const [filterdata, setfilterdata] = useState([]);
  const [filter, setfilter] = useState("");

  const handle = async(e) => {
    let Grade=e.target.value
    const res = await axios.post(
      "/api/auth/slumidsearch",
      {
        Grade: Grade,
      }
    );
    setfilterdata(res.data);
  };
  console.log(filterdata);
  const fmap = () => {
    try {
      // console.log(data);
      const ffmap = filterdata.map((row, index) => {
        console.log(row);
        return (
          // {Object}.key(filterdata[0]),
          <tr>
            {Object.keys(filterdata[0]).filter((item, index) => {
                    // console.log(item);
                    return item !== "_id";
                  })
                  .map((key, index) => {
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
      const hhmap = Object.keys(filterdata[0]).filter((item, index) => {
        // console.log(item);
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

  return (
    <div className="checkgradetop">
      
      <div className="checkgradeboader">
        <SideNavigation />
      <Header/>
        <div className="AddFlex">
          <div style={{ width: "70%", marginLeft: "30%", marginTop: "5%" }}>
            <select
              style={{ width: "50%" }}
              onChange={handle}
              className="form-select form-select-lg mb-3"
              aria-label="Default select example"
            >
              <option className="option" selected disabled>
                Grade
              </option>
              <option className="option">A</option>
              <option className="option">B</option>
              <option>C</option>
              <option>D</option>
              
            </select>

            <div style={{ width: "100%" ,overflowX:"hidden"}}>
              {filterdata.length >= 1 ? (
                <>
                   <div
                      style={{
                        overflow: "scroll",
                        // height:"300px",

                      }}
                      className="table-responsive"
                    >
                      <table className="table" responsive="true">
                        <thead>
                          <tr>
                            {
                              <>
                                {hmap()}
                                <th>edit</th>
                              </>
                            }
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
    </div>
  );
};
