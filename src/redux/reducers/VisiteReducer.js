import * as actionTypes from '../actions/actionTypes';

export default function VisiteReducer(state = true, action) {
    switch (action.type) {
        case actionTypes.SET_VISITE:
            return action.payload;

        default:
            return state;
    }
}

