import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "./Header";
import { SideNavigation } from "./SideNavigation";

        export const FIlterulb = () => {
      const [data, setData] = useState([]);
      const [filterdata, setfilterdata] = useState([]);
    const {district}= useParams()
    console.log(district);
      
      const searchdistrict = async (e) => {
    
        const res = await axios.post(
          "/api/auth/searchall",{Name_of_the_District:district}
        );
      console.log(res.data);
      setfilterdata(res.data);
      };
      useEffect(() => {
        searchdistrict();
      }, []);
      const getUniqueBy = (arr, prop) => {
        const set = new Set;
        return arr.filter(o => !set.has(o[prop]) && set.add(o[prop]));
      };
      const fmap = () => {
        try {
          // console.log(data);
          const ffmap = getUniqueBy(filterdata,'Name_of_ulb').map((row, index) => {
            console.log(row.Name_of_ulb);
            return (
              // {Object}.key(filterdata[0]),
              <tr>
                <Link to={row.Name_of_ulb}>
                <td>{row.Name_of_ulb}</td>
                </Link>
              </tr>
            )
          })
          return ffmap;
        } catch (error) {
          console.log(error);
        }
      };
      const hmap = () => {
        try {
          const hhmap = Object.keys(filterdata[0]).map((heading) => {
            console.log(heading);
            return <th>{heading[13]}</th>;
          });
          return hhmap;
        } catch (error) {
          console.log(error);
        }
      };
      return (
    
        <div>
           <Header/>
      <SideNavigation />
          <div className="AddFlex">
            <div style={{ width: "70%", marginLeft: "23%",marginTop:"10%" }}>
           
    
            
    
              <div style={{ width: "20%" }}>
                {filterdata.length >=1 ? (
                  <>
                    <div
                      style={{ overflow: "scroll" }}
                      className="table-responsive"
                      >
                      <table className="table" responsive="true">
                        <thead>
                          <tr><td>Name_of_ulb</td></tr>
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
    )
    };
    
