import * as actionTypes from '../actions/actionTypes';

export default function CameraReducer(state = "", action) {
    switch (action.type) {
        case actionTypes.UPDATE_URI:
            return action.payload;

        default:
            return state;
    }
}