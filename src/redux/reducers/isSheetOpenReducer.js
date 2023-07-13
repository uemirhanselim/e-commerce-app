import * as actionTypes from '../actions/actionTypes'

export default function IsSheetOpenReducer(state = false, action) {
    switch (action.type) {
        case actionTypes.SET_IS_SHEET_OPEN:
            
            return action.payload;
    
        default:
            return state;
    }
}