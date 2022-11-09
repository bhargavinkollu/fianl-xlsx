import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { SideNavigation } from "./SideNavigation";
import "./checkgrade.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../action/useraction";
import { Header } from "./Header";
export const Checkgrade = () => {
  const { user, isAuthenticated, res, error, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterdata, setfilterdata] = useState([]);

  const [sghid, setSghid] = useState("");

  // const handle = (e) => {
  //   setValue("");
  //   setfilterdata("");
  //   console.log(e.target.value);
  //   setfilter(e.target.value);
  // };

  const fmap = () => {
    try {
      console.log(filterdata);
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
  const [data, setdata] = useState([]);

  const [value, setValue] = useState("");
  const [nodatas, setNodata] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = data.filter((option) => option["SHGID"].includes(value));

  const autocompleteRef = useRef();
  const api = async () => {
    const res = await axios.post("/api/auth/slumidsearch");
    setdata(res.data);
  };
  

  useEffect(() => {
    if (user) {
      if (user.role === "user") {
        dispatch(logout());
        navigate("/employeelogin");
      }
    } else {
      navigate("/");
    }
    const handleClick = (event) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    api();
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [dispatch, navigate, user]);

  const handleChange = async (name) => {
    setValue("");
    // console.log(name.name);
    // console.log(name.valued);
    setSghid(name.valued);

    setValue(name.valued);
    // console.log(name.valued);
    const res = await axios.post("/api/auth/slumidsearch", {
      [name.name]: name.valued,
      // year:getCurrentFinancialYear()
    });
    console.log(res.data.length);
    if (res.data.length === 0) {
      // alert("nodata");
    }
    setNodata(true)

    // setfilterdata(res.data);
  };
  const handledistrictSuggestionClick = async (suggest) => {
    let vl = suggest.suggest;
    let nam = suggest.name;
    const res = await axios.post("/api/auth/slumidsearch", {
      [suggest.name]: vl,
    });
    // console.log(nam);
    setfilterdata(res.data);

    setValue(suggest.suggest);
    setShowSuggestions(false);
  };
  const searchdis = async (event) => {
    // console.log(sghid);
    // console.log(event.target.value);
    console.log(getCurrentFinancialYear());
    const res = await axios.post("/api/auth/searchall", {
      SHGID: sghid,
      year: event.target.value,
    });
    // console.log(res.data);
    setfilterdata(res.data);
  };
  const nodata = "no data found";
  console.log(new Date().getFullYear());

  const nsns = new Date().getFullYear().toString();

  console.log(nsns.slice(2));
  function getCurrentFinancialYear() {
    var financial_year = "";
    var today = new Date();
    if (today.getMonth() + 1 <= 3) {
      financial_year =
        (new Date().getFullYear() - 1).toString().slice(2) +
        "-" +
        today.getFullYear();
    } else {
      financial_year =
        nsns + "-" + (today.getFullYear() + 1).toString().slice(2);
    }
    return financial_year;
  }
  console.log(filterdata.length);
  return (
    <div className="viewlisttop">
      <div className="viewlistboarder">
        <SideNavigation />
        <Header />
        <div className="AddFlex">
          <div className="viewlistmain">
            <div style={{ width: "70%", marginLeft: "23%" }}>
              {/* <select
              style={{ width: "50%" }}
              onChange={handle}
              className="form-select form-select-lg mb-3"
              aria-label="Default select example"
            >
              <option className="option" selected disabled>
                Filter
              </option>
              <option className="option">District</option>
              <option>ulb</option>
              <option>Tlf Name</option>
              <option>Slf Name</option>
              <option>SHG ID</option>
            </select> */}

              <div className="formgroup">
                <div className="autocomplete" ref={autocompleteRef}>
                  <div
                    class="input-group mb-3 AddFlex"
                    style={{ width: "30%" }}
                  >
                    <div class="input-group-prepend">
                      <span class="input-group-text">SHGID</span>
                    </div>
                    <input
                      className="form-control "
                      list="list"
                      value={value}
                      autoComplete="off"
                      onChange={(e) => {
                        handleChange({
                          name: "SHGID",
                          valued: e.target.value,
                        });
                      }}
                      placeholder="Search"
                      onFocus={() => {setShowSuggestions(true)}}
                    />
                  </div>
                  <label>Financial Year:</label>
                  <select required onChange={searchdis}>
                    <option selected disabled value={getCurrentFinancialYear()}>
                      {/* Current year:<br/>{getCurrentFinancialYear()} */}
                      select year
                    </option>

                    <option value="2020-21">2020-21</option>
                    <option value="2021-22">2021-22</option>
                    <option value="2022-23">2022-23</option>
                    <option value="2023-24">2023-24</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2025-26">2025-26</option>
                    <option value="2026-27">2026-27</option>
                    <option value="2027-28">2027-28</option>
                    <option value="2028-29">2028-29</option>
                    <option value="2029-30">2029-30</option>
                    <option value="2030-31">2030-31</option>
                  </select>
                  {showSuggestions && (
                    <datalist id="list" className="suggestions">
                      {suggestions.map((suggestion) => {
                        // console.log(suggestion);
                        return (
                          <option
                            style={{ listStyleType: "none" }}
                            onClick={() =>
                              handledistrictSuggestionClick({
                                suggest: suggestion["SHGID"],
                                name: "SHGID",
                              })
                            }
                            key={suggestion["SHGID"]}
                          >
                            {suggestion["SHGID"]}
                          </option>
                        );
                      })}
                    </datalist>
                  )}
                </div>
              </div>

              <div style={{ width: "100%" }}>
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
                  nodatas === true?("No data found"):("") 
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
