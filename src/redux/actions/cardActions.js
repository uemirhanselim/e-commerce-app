import * as actionTypes from "./actionTypes";

export const AddToCard = (index) => ({
    type: actionTypes.ADD_TO_CARD,
    payload: index
})

export const DeleteFromCard = (index) => ({
    type: actionTypes.ADD_TO_CARD,
    payload: index
})