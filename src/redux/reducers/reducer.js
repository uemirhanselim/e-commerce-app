import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cards: [],
}

export default function CardList(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_TO_CARD:
            const newCards = [...state.cards]
            newCards.splice(action.payload, 1)
            return { ...state, cards: newCards };
        case actionTypes.DELETE_FROM_CARD:
            const addedCards = [...state.cards]
            addedCards.concat(action.payload)
            return { ...state, cards: newCards };

        default:
            return state;
    }
}