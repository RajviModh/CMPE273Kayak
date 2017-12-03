import {combineReducers, compose, createStore} from "redux";
import reducerFlights from '../reducers/reducer-flights';
import reducerHotels from '../reducers/reducer-hotels';
import reducerCars from '../reducers/reducer-cars';
import {autoRehydrate, persistStore} from 'redux-persist';

let store = compose(autoRehydrate())(createStore)(combineReducers({reducerFlights, reducerHotels, reducerCars}));
persistStore(store);

export default store;
