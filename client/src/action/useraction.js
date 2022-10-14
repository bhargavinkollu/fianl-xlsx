import {
  CLEAR_ERRORS,
  DETAIL_USER_FAIL,
  DETAIL_USER_REQUEST,
  DETAIL_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  NEW_FORM_FAIL,
  NEW_FORM_request,
  NEW_FORM_SUCCESS,
  UPDATE_PROFIE_FAIL,
  UPDATE_PROFIE_REQUEST,
  UPDATE_PROFIE_SUCCESS,
  VIEW_LIST_FAIL,
  VIEW_LIST_REQUEST,
  VIEW_LIST_SUCCESS,
} from "../constant/userconstant";
import axios from "axios";
const bashurl = "http://localhost:5000";
export const login = (email, password) => async (dispatch) => {
  try {
    console.log(email, password);
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(`/api/auth/login`, {
      email,
      password,
    });
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    console.log(data);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data });
  }
};
export const emplyelogin = (email, password) => async (dispatch) => {
  try {
    console.log(email, password);
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post(`/api/auth/employlogin`, {
      email,
      password,
    });
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    console.log(data);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data });
  }
};
export const loaduser = () => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_USER_REQUEST });
    const { data } = await axios.get(`/api/auth/me`);

    dispatch({ type: DETAIL_USER_SUCCESS, payload: data.user });

    // console.log(data.user);
  } catch (error) {
    dispatch({ type: DETAIL_USER_FAIL });
  }
};
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });
    await axios.get(`/api/auth/logout`);

    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
  }
};
export const uploadform=(formdata)=>async(dispatch)=>{
  console.log(formdata);
try{
  dispatch({type:NEW_FORM_request});
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const{data}=await axios.put(`/api/auth/uploadForm`,
    formdata,config
  )
  dispatch({type:NEW_FORM_SUCCESS,payload:data});
}
catch(error){
  dispatch({type:NEW_FORM_FAIL})
}
}
export const uploadsheet=(formdata)=>async(dispatch)=>{
  console.log(formdata);
try{
  dispatch({type:NEW_FORM_request});
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const{data}=await axios.post(`/api/auth/upload`,
    formdata,config
  )
  dispatch({type:NEW_FORM_SUCCESS,payload:data});
}
catch(error){
  dispatch({type:NEW_FORM_FAIL,payload: error.response.data,})
}
}
export const updateprofile = (updatedata) => async (dispatch) => {
  try {
    console.log(updatedata)
    
    dispatch({ type: UPDATE_PROFIE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
      const data = await axios.post(
        `/api/auth/uploadForm`,
        {"data":updatedata}
        
      );
    // console.log(updatedata);
    dispatch({ type: UPDATE_PROFIE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFIE_FAIL,
      payload: error.response.data,
    });
  }
};

  
//clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
