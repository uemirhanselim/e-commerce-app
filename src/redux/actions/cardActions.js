import * as actionTypes from "./actionTypes";

export const AddToCard = (item) => ({
    type: actionTypes.ADD_TO_CARD,
    payload: item
})

export const DeleteFromCard = (id) => ({
    type: actionTypes.ADD_TO_CARD,
    payload: id
})

export const UpdateURI = (uri) => ({
    type: actionTypes.UPDATE_URI,
    payload: uri
})