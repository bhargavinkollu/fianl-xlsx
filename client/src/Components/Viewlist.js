import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apidata } from "../action/apiaction";
import { logout } from "../action/useraction";
import { Header } from "./Header";
import { LOader } from "./LOader";
import { Pagination } from "./Pagination";
import { SideNavigation } from "./SideNavigation";
import "./viewlist.css";

export const Viewlist = () => {
  const { loading, filedata } = useSelector((state) => state.apidata);
  const [editdata, seteditdata] = useState([]);
  const [sghfilter, setsghfilter] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;

  const nPages = Math.ceil(sghfilter.length / recordsPerPage);
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  
  let currentRecords = sghfilter.slice(indexOfFirstRecord, indexOfLastRecord);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [showSuggestions, setShowSuggestions] = useState(false);

  ////
  const [value, setValue] = useState("");

  const suggestions = filedata.filter((option) =>
    option["SHG Id"].includes(value)
    // console.log(option["SHG ID"])
  );
  const handleChange = (name) => {
    setValue(name.valued);

    const sghidfilter = filedata.filter((key, index) => {
      return key["SHG Id"].includes(name.valued);
      // return row
    });
    setsghfilter(sghidfilter);
  };
  // console.log(suggestions);
  const handledistrictSuggestionClick = async (suggest) => {
    let vl = suggest.suggest;
    let nam = suggest.name;
    // console.log(vl, nam);

    // console.log(nam);
// 
    setValue(suggest.suggest);
    setShowSuggestions(false);
  };
  ////
  let pagelimit = 20;
  // console.log(isAuthenticated);

  // console.log(currentRecords);
  const edit = async (id) => {
    let res = await axios.post('/api/auth/edit', { id });
    let datat = await res.data;
    console.log(datat);
    seteditdata(datat);
    // setflag(false)
    // console.log(datat);
  };
  const fmap = () => {
    try {
      const ffmap = currentRecords.map((row, index) => {
        return (
          <tr>
            {Object.keys(currentRecords[0])
              .filter((item, index) => {
                return item !== "_id";
              })
              .map((key, index) => {
                return <td style={{ textAlign: "left" }}>{row[key]}</td>;
              })}
            <button
              type="button"
              className="btn btn-primary m-2"
              data-toggle="modal"
              style={{ color: "black" }}
              data-target="#exampleModal"
              onClick={() => {
                edit(row["_id"]);
              }}
            >
              edit
            </button>
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
      const hhmap = Object.keys(currentRecords[0])
      .filter((item, index) => {
          return item !== "_id";
        })
        .map((heading) => {
          return (
            <th className="thheading" scope="col">
              {heading}
            </th>
          );
        });
      return hhmap;
    } catch (error) {
      console.log(error);
    }
  };

  const edithandle = (e) => {
    const { name, value } = e.target;
    seteditdata({ ...editdata, [name]: value });
  };

  const update = async (e) => {
    e.preventDefault();
    // console.log(editdata);
    
    let res = await axios.put("/api/auth/update", editdata);
    let data = await res.data;
    console.log(data);
    if(data.success==="update"){

    }
  };useEffect(() => {
    // console.log(user);

    if (user) { 
      if (user.role === "user") {
        dispatch(logout());
        navigate("/employeelogin");
      }
    } else {
      navigate("/");
    }
  
  }, [dispatch, filedata, isAuthenticated, navigate, user,update]);
  const deletedata=()=>{
    axios.post("http://localhost:5000/deleteclient")
  }
  const modeldata = () => {
    const modelbox = (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={update}>
              <div className="form-group">
                {Object.keys(currentRecords[0])
                  .filter((item, index) => {
                    // console.log(item);
                    return item !== "_id";
                  })
                  .map((heading) => {
                    console.log(heading);
                    return (
                      <>
                        <>
                          <label htmlFor={`example${heading}`}>{heading}</label>
                          <input
                            type="name"
                            className="form-control"
                            name={heading}
                            id={`example${heading}`}
                            value={editdata[heading]}
                            onChange={edithandle}
                            aria-describedby="emailHelp"
                            placeholder={`Enter ${ heading}`}
                          />
                        </>
                      </>
                    );
                  })}
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
    return modelbox;
  };
  return (
    <div className="viewlisttop">
      <div className="viewlistboarder">
        <SideNavigation />
        <Header />
        {/* <button className="btn btn-primary" onClick={deletedata}>
                deletedata
              </button> */}
        {/* <button onClick={sgg}>asa</button> */}

        {showSuggestions && (
          <datalist id="list" className="suggestions">
            {suggestions.map((suggestion) => {
              // console.log(suggestion["SHG ID"]);
              return (
                <option
                  style={{ listStyleType: "none" }}
                  onClick={() =>
                    handledistrictSuggestionClick({
                      suggest: suggestion["SHG Id"],
                      name: "SHG Id",
                    })
                  }
                  // key={suggestion["SHG Id"]}
                >
                  {suggestion["SHG Id"]}
                </option>
              );
            })}
          </datalist>
        )}

        {loading ? (
          <LOader />
        ) : (
          <>
            <div className="AddFlex">
              <div className="viewlistmain">
                <input
                  className="form-control"
                  list="list"
                  style={{ width: "30%",marginRight:"30%" }}
                  value={value}
                  autoComplete="off"
                  onChange={(e) => {
                    handleChange({
                      name: "SHG ID",
                      valued: e.target.value,
                    });
                  }}
                  placeholder="Search"
                  onFocus={() => setShowSuggestions(true)}
                />
                {sghfilter.length !== 0 ? (
                  <>
                    <div
                      style={{
                        overflow: "scroll",
                        width: "70%",
                        overflowY: "hidden",
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
                    {modeldata()}
                    <Pagination
                      nPages={nPages}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      disabledClass
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
