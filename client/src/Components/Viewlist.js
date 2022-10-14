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
  const { loading,filedata} = useSelector((state) =>state.apidata);
  const [editdata, seteditdata] = useState([]);

  const [keys, setKeys] = useState([]);
  const [object, setObject] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;

  const nPages = Math.ceil(filedata.length / recordsPerPage);
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  let currentRecords = filedata.slice(indexOfFirstRecord, indexOfLastRecord);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const getdata = async () => {
    dispatch(apidata())
    // setdata(res.data);
    // res.data.map((items, index) => {
    //   // console.log(items);
    //   if (index === 1) {
    //     setKeys(Object.keys(items));
    //   }
    //   // console.log(keys);
    // });
  };
  let pagelimit = 20;
  if (isAuthenticated === false) {
    navigate("/");
  }
  if (user.role === "user") {
    dispatch(logout());
    navigate("/employeelogin");
  }
  console.log(filedata);
  useEffect(() => {
    getdata();
  }, []);
  const edit = async (id) => {
    console.log(id);
    let res = await axios.post(`http://localhost:5000/edit`, { id });
    let datat = await res.data;
    console.log(datat);
    seteditdata(datat);
    // setflag(false)
    console.log(datat);
  };
  const fmap = () => {
    try {
      // console.log(data);
      const ffmap = currentRecords.map((row, index) => {
        // console.log(row);
        return (
          <tr>
            {Object.keys(currentRecords[0]).map((key, index) => {
              // console.log([key]);
              return <td>{row[key]}</td>;
            })}
            <button
              type="button"
              className="btn btn-primary m-2"
              data-toggle="modal"
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
      const hhmap = Object.keys(currentRecords[0]).map((heading) => {
        // console.log(heading);
        return <th>{heading}</th>;
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
  console.log(editdata);

  const update = async (e) => {
    e.preventDefault();
    console.log(editdata);

    let res = await axios.put("http://localhost:5000/update", editdata);
    let data = await res.data;
    console.log(data);
  };
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
                {Object.keys(currentRecords[0]).map((heading) => {
                  return<>
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
                    placeholder="Enter email"
                  />
                  
                  </></>

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
    <div>
      <Header />

      <SideNavigation />
      {loading?(<LOader/>):
        <>
          <div className="AddFlex">
            <div style={{ width: "100%" }}>
              {filedata.length !== 0 ? (
                <>
                  <div
                    style={{
                      overflow: "scroll",
                      width: "70%",
                      margin: "80px 21%",
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
                  <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    disabledClass
                  />
                {modeldata()}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      }
    </div>
  );
};
