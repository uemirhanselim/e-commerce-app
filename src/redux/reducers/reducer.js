import * as actionTypes from '../actions/actionTypes';

export default function Reducer(state = { items: [] }, action) {
    switch (action.type) {
        case actionTypes.ADD_TO_CARD:
            return { items: [...state.items, action.payload] };

        case actionTypes.DELETE_FROM_CARD:
            const deleteCards = state.items.filter((item) => {
                return item['id'] !== action.payload
            })
            return deleteCards;

        default:
            return state;
    }
}