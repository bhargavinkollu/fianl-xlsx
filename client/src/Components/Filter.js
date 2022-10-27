import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";

import { SideNavigation } from "./SideNavigation";
import "./viewlist.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../action/useraction";
import { Header } from "./Header";
export const Filter = () => {
  const { user, isAuthenticated, res, error, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setfilter] = useState("");
  const [filterdata, setfilterdata] = useState([]);

  if (isAuthenticated === false) {
    navigate("/");
  }
  console.log(isAuthenticated);

  const handle = (e) => {
    setValue("");
    setfilterdata("");
    console.log(e.target.value);
    setfilter(e.target.value);
  };

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
  const [data, setdata] = useState([]);

  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = data.filter((option) =>
    option.Name_of_the_District.includes(value)
  );

  const suggestionsulb = data.filter((option) =>
    option.Name_of_ulb.includes(value)
  );
  const suggestionstlf = data.filter((option) =>
    option.TLF_NAME.includes(value)
  );
  const suggestionsslf = data.filter((option) =>
    option.SLF_NAME.includes(value)
  );
  const suggestionssgh = data.filter((option) => option.sghid.includes(value));

  const autocompleteRef = useRef();
  const api = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/slumidsearch");
    setdata(res.data);
  };

  useEffect(() => {
    if (user) {
      if (user.role === "user") {
        dispatch(logout());
        navigate("/employeelogin");
      }
    else{
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
  } []);

  const handleChange = async (name) => {
    setValue("");
    console.log(name.name);
    console.log(name.valued);

    setValue(name.valued);
    console.log(name.valued);
    const res = await axios.post("/api/auth/slumidsearch", {
      [name.name]: name.valued,
    });
    setfilterdata(res.data);
  };
  const handledistrictSuggestionClick = async (suggest) => {
    let vl = suggest.suggest;
    let nam = suggest.name;
    const res = await axios.post("/api/auth/slumidsearch", {
      [suggest.name]: vl,
    });
    console.log(nam);
    setfilterdata(res.data);

    setValue(suggest.suggest);
    setShowSuggestions(false);
  };
  return (
    <div className="viewlisttop">
    <div className="viewlistboarder">
      <SideNavigation />
      <Header />
      <div className="AddFlex">
        <div style={{ width: "70%", marginLeft: "23%", marginTop: "10%" }}>
          <select
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
          </select>

          {filter === "District" ? (
            <>
              {" "}
              <div className="formgroup">
                
                <div className="autocomplete" ref={autocompleteRef}>
               
                  <div class="input-group mb-3" style={{width:"30%"}}>
                    <div class="input-group-prepend">
                      <span class="input-group-text">District</span>
                    </div>
                    <input
                      className="form-control"
                      list="list"
                      value={value}
                      autoComplete="off"
                      onChange={(e) => {
                        handleChange({
                          name: "Name_of_the_District",
                          valued: e.target.value,
                        });
                      }}
                      placeholder="Search"
                      onFocus={() => setShowSuggestions(true)}
                    />
                   
                  </div>
                  {showSuggestions && (
                    <datalist id="list" className="suggestions">
                      {suggestions.map((suggestion) => {
                        console.log(suggestion);
                        return (
                          <option
                            style={{ listStyleType: "none" }}
                            onClick={() =>
                              handledistrictSuggestionClick({
                                suggest: suggestion.Name_of_the_District,
                                name: "Name_of_the_District",
                              })
                            }
                            key={suggestion.Name_of_the_District}
                          >
                            {suggestion.Name_of_the_District}
                          </option>
                        );
                      })}
                    </datalist>
                  )}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {filter === "ulb" ? (
            <>
              {" "}
              <div className="formgroup">
                <div className="autocomplete" ref={autocompleteRef}>
            
                     <div class="input-group mb-3" style={{width:"30%"}}>
                    <div class="input-group-prepend">
                      <span class="input-group-text">Ulb</span>
                    </div>
                    <input
                      className="form-control"
                      list="list"
                      value={value}
                      autoComplete="off"
                      onChange={(e) => {
                        handleChange({
                          name: "Name_of_ulb",
                          valued: e.target.value,
                        });
                      }}
                      placeholder="Search"
                      onFocus={() => setShowSuggestions(true)}
                    />
                   
                  </div>
                  {showSuggestions && (
                    <datalist id="list" className="suggestions">
                      {suggestionsulb.map((suggestion) => {
                        console.log(suggestion);
                        return (
                          <option
                            style={{ listStyleType: "none" }}
                            onClick={() =>
                              handledistrictSuggestionClick({
                                suggest: suggestion.Name_of_ulb,
                                name: "Name_of_ulb",
                              })
                            }
                            key={suggestion.Name_of_ulb}
                          >
                            {suggestion.Name_of_ulb}
                          </option>
                        );
                      })}
                    </datalist>
                  )}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {filter === "Tlf Name" ? (
            <>
              {" "}
              <div className="formgroup">
                <div className="autocomplete" ref={autocompleteRef}>
             
                    <div class="input-group mb-3" style={{width:"30%"}}>
                    <div class="input-group-prepend">
                      <span class="input-group-text">Tlf Name</span>
                    </div>
                    <input
                      className="form-control"
                      list="list"
                      value={value}
                      autoComplete="off"
                      onChange={(e) => {
                        handleChange({
                          name: "TLF_NAME",
                        valued: e.target.value,
                        });
                      }}
                      placeholder="Search"
                      onFocus={() => setShowSuggestions(true)}
                    />
                   
                  </div>
                  {showSuggestions && (
                    <datalist id="list" className="suggestions">
                      {suggestionstlf.map((suggestion) => {
                        console.log(suggestion);
                        return (
                          <option
                            style={{ listStyleType: "none" }}
                            onClick={() =>
                              handledistrictSuggestionClick({
                                suggest: suggestion.TLF_NAME,
                                name: "TLF_NAME",
                              })
                            }
                            key={suggestion.TLF_NAME}
                          >
                            {suggestion.TLF_NAME}
                          </option>
                        );
                      })}
                    </datalist>
                  )}
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {filter === "Slf Name" ? (
            <>
              {" "}
              <div className="formgroup">
                <div className="autocomplete" ref={autocompleteRef}>
                  
                     <div class="input-group mb-3" style={{width:"30%"}}>
                    <div class="input-group-prepend">
                      <span class="input-group-text">SLF name</span>
                    </div>
                    <input
                      className="form-control"
                      list="list"
                      value={value}
                      autoComplete="off"
                      onChange={(e) => {
                        handleChange({
                          name: "SLF_NAME",
                        valued: e.target.value,
                        });
                      }}
                      placeholder="Search"
                      onFocus={() => setShowSuggestions(true)}
                    />
                   
                  </div>
                  {showSuggestions && (
                    <datalist id="list" className="suggestions">
                      {suggestionsslf.map((suggestion) => {
                        console.log(suggestion);
                        return (
                          <option
                            style={{ listStyleType: "none" }}
                            onClick={() =>
                              handledistrictSuggestionClick({
                                suggest: suggestion.SLF_NAME,
                                name: "SLF_NAME",
                              })
                            }
                            key={suggestion.SLF_NAME}
                          >
                            {suggestion.SLF_NAME}
                          </option>
                        );
                      })}
                    </datalist>
                  )}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {filter === "SHG ID" ? (
            <>
              {" "}
              <div className="formgroup">
                <div className="autocomplete" ref={autocompleteRef}>
                 
                    <div class="input-group mb-3" style={{width:"30%"}}>
                    <div class="input-group-prepend">
                      <span class="input-group-text">SHG ID</span>
                    </div>
                    <input
                      className="form-control"
                      list="list"
                      value={value}
                      autoComplete="off"
                      onChange={(e) => {
                        handleChange({
                          name: "sghid",
                        valued: e.target.value,
                        });
                      }}
                      placeholder="Search"
                      onFocus={() => setShowSuggestions(true)}
                    />
                   
                  </div>
                  {showSuggestions && (
                    <datalist id="list" className="suggestions">
                      {suggestionssgh.map((suggestion) => {
                        console.log(suggestion);
                        return (
                          <option
                            style={{ listStyleType: "none" }}
                            onClick={() =>
                              handledistrictSuggestionClick({
                                suggest: suggestion.sghid,
                                name: "sghid",
                              })
                            }
                            key={suggestion.sghid}
                          >
                            {suggestion.sghid}
                          </option>
                        );
                      })}
                    </datalist>
                  )}
                </div>
              </div>
            </>
          ) : (
            ""
          )}

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
              ""
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
