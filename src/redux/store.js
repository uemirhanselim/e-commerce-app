import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import ProductReducer from "./reducers/reducer";
import CameraReducer from "./reducers/cameraReducer";
import VisiteReducer from "./reducers/VisiteReducer";
import OrderReducer from "./reducers/orderReducer";
import PaymentReducer from "./reducers/paymentReducer";
import StartDateReducer from './reducers/startDateReducer';
import EndDateReducer from './reducers/endDateReducer';
import FilterOnReducer from "./reducers/filterOn";
import IsSheetOpenReducer from "./reducers/isSheetOpenReducer";

const reducers = combineReducers({
    ProductReducer,
    CameraReducer,
    VisiteReducer,
    OrderReducer,
    PaymentReducer,
    StartDateReducer,
    EndDateReducer,
    FilterOnReducer,
    IsSheetOpenReducer
})

const store = createStore(reducers, applyMiddleware(thunk, logger));

export default store;






// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import Reducer from './reducers/reducer'

// const reducers = combineReducers({ data: Reducer })
// const store = configureStore({ reducer: reducers })

// export default store