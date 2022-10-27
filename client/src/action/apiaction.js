import { API_FAIL, API_REQUEST, API_SUCCESS } from "../constant/apiconstant";
import axios from "axios";

export const apidata =()=> async(dispatch)=> {
  try {
    dispatch({ type: API_REQUEST });
    const { data } = await axios.get("/api/auth/getxlsxfile");
    console.log(data);

    dispatch({ type: API_SUCCESS, payload:data});
  } catch (error) {
    dispatch({ type: API_FAIL });

    // console.log(error.response);
  }
};
export const apidat =()=> async(dispatch)=> {
  try {
    dispatch({ type: API_REQUEST });
    const { data } = await axios.get("/api/auth/slumidsearch");
    console.log(data);

    dispatch({ type: API_SUCCESS, payload:data});
  } catch (error) {
    dispatch({ type: API_FAIL });

    // console.log(error.response);
  }
};




