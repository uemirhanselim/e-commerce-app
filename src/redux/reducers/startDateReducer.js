import * as actionTypes from '../actions/actionTypes';

export default function StartDateReducer(state = "", action) {
    switch (action.type) {
        case actionTypes.SET_START_DATE:

            return action.payload;

        default:
            return state;
    }
}