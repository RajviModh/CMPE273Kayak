import {createStore, compose, combineReducers,applyMiddleware} from "redux";
import userReducer from "../reducer/userReducer";
import hotelReducer from "../reducer/hotelReducer";
import fligthReducer from "../reducer/flightReducer";
import carReducer from "../reducer/carReducer";
import adminReducer from "../reducer/adminReducer";
import {persistStore} from 'redux-persist'

let store = (createStore)(combineReducers({userReducer,hotelReducer,fligthReducer,carReducer,adminReducer}));
persistStore(store);

export default store;
