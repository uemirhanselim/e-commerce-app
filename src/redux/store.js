import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import ProductReducer from "./reducers/reducer";
import CameraReducer from "./reducers/cameraReducer";

const reducers = combineReducers({
    ProductReducer,
    CameraReducer,
})

const store = createStore(reducers, applyMiddleware(thunk, logger));

export default store;






// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import Reducer from './reducers/reducer'

// const reducers = combineReducers({ data: Reducer })
// const store = configureStore({ reducer: reducers })

// export default store