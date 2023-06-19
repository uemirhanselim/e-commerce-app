import * as actionTypes from '../actions/actionTypes';

export default function PaymentReducer(state = true, action) {
    switch (action.type) {
        case actionTypes.SET_PAYMENT:
            return action.payload;

        default:
            return state;
    }
}