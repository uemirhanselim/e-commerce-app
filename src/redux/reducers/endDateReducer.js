import * as actionTypes from '../actions/actionTypes';

export default function EndDateReducer(state = "", action) {
    switch (action.type) {
        case actionTypes.SET_END_DATE:

            return action.payload;

        default:
            return state;
    }
}