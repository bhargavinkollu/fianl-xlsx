import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "./Components/Header";
import { SideNavigation } from "./Components/SideNavigation";
export const Filtertlf = () => {
  const {ulb}= useParams()
  console.log(ulb);
  const getUniqueBy = (arr, prop) => {
    const set = new Set;
    return arr.filter(o => !set.has(o[prop]) && set.add(o[prop]));
  };
          const [data, setData] = useState([]);
          const [filterdata, setfilterdata] = useState([]);
        
          
          const searchdistrict = async (e) => {
        
            const res = await axios.post(
              "/api/auth/searchall",{"Name_of_ulb":ulb}
            );
          console.log(res.data);
          setfilterdata(res.data);
          };
          useEffect(() => {
            searchdistrict();
          }, []);
        
          const fmap = () => {
            try {
              // console.log(data);
              const ffmap = getUniqueBy(filterdata,"TLF_NAME").map((row, index) => {
                console.log(row.TLF_NAME);
                return (
                  // {Object}.key(filterdata[0]),
                  <tr>
                    <Link to={row.TLF_NAME}>
                    <td>{row.TLF_NAME}</td>
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
                              <tr><td>TLF_NAME</td></tr>
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
        
    
