import {createStore,combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { userReducer } from "./reducers/userReducer.js"
import { apiReducer } from "./reducers/apireduce.js"



const reducer = combineReducers({
    user:userReducer,
    apidata:apiReducer


})

const middleware = [thunk]

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store