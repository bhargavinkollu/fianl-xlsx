import {
  CLEAR_ERRORS,
  DETAIL_USER_FAIL,
  DETAIL_USER_REQUEST,
  DETAIL_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFIE_FAIL,
  UPDATE_PROFIE_REQUEST,
  UPDATE_PROFIE_SUCCESS,
  NEW_FORM_request,
  NEW_FORM_SUCCESS,
  NEW_FORM_FAIL,
  LOGOUT_USER_REQUEST,
 
} from "../constant/userconstant";
const INTIAL_STATE={
  user:{},
  loading:false,
  isAuthenticated:false,

}
export const userReducer = (state =INTIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
      case LOGOUT_USER_REQUEST:
      return {
        loading: true,
        // isAuthenticated: false,
      };


    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return {
        ...state, 
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case DETAIL_USER_REQUEST:
      return {
        loading: true,
        user:"loading",
        // isAuthenticated: false,
      };
    case DETAIL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case DETAIL_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_PROFIE_REQUEST:
    case NEW_FORM_request:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_PROFIE_SUCCESS:
 
      return {
        ...state,
        loading: false,
        isUpdated:action.payload
        
      };
    case UPDATE_PASSWORD_FAIL:
    case UPDATE_PROFIE_FAIL:
    case NEW_FORM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        isUpdated:false
      };
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
      };
      case NEW_FORM_SUCCESS:
        return {
          ...state,
          loading: false,
          success:action.payload.message,
          isUpdated: true,
        };
    default:
      return state;
  }
};
