import * as actionTypes from '../actions/actionTypes'

export default function FilterOnReducer(state = false, action) {
    switch (action.type) {
        case actionTypes.SET_FILTER_ON:
            
            return action.payload;
    
        default:
            return state;
    }
}