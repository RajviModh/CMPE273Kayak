import {createStore, compose, combineReducers} from "redux";
import reducerFlights from '../reducers/reducer-flights';
import {persistStore, autoRehydrate} from 'redux-persist';

let store = compose(autoRehydrate())(createStore)(combineReducers({reducerFlights}));
persistStore(store);

export default store;
