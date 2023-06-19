import * as actionTypes from '../actions/actionTypes';

export default function OrderReducer(state = true, action) {
    switch (action.type) {
        case actionTypes.SET_ORDER:
            return action.payload;

        default:
            return state;
    }
}