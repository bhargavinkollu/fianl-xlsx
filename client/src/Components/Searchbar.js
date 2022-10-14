import React from 'react'

export const Searchbar = (props) => {

const handleChange = (event)=>{
props.search(event.target.value)
}


//// ////
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
  let district = "";
  const searchdistrict = async (e) => {
    district = e.target.value;
    console.log(district);
    const res = await axios.post(
      "/api/auth/slumidsearch",
      {
        Name_of_the_District: district,
      }
    );
    setfilterdata(res.data);
  };
//// ////
  return (
    <div className="search-bar">
    <div className="input-group md-form form-sm form-2 pl-0">
      <input
        className="form-control my-0 py-1 red-border"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={(event)=>handleChange(event)}
      />
      <div className="input-group-append">
        <span
          className="input-group-text red lighten-3"
          id="basic-text1"
        >
          <i className="fas fa-search text-grey" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  </div>

  )
}