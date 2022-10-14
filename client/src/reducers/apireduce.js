
import { API_FAIL, API_REQUEST, API_SUCCESS } from "../constant/apiconstant";
const initialState = {
    filedata: [],
    loading: true,
  };

export const apiReducer = (state =initialState,action)=>{

switch(action.type){
   case API_REQUEST:
    return{
        loading:true,
        isapi:false,
        filedata:[]
    };
    case API_SUCCESS:
        return {
            ...state,
            loading:false,
            isapi:true,
            filedata:action.payload,

        }
    case API_FAIL:
        return {
            ...state,
            loading:false,
            isapi:true,
            error:action.payload,

        };
        
    default:
        return state;

}


}