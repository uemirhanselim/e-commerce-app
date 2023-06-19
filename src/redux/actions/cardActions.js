import * as actionTypes from "./actionTypes";

export const AddToCard = (item) => ({
    type: actionTypes.ADD_TO_CARD,
    payload: item
})

export const DeleteFromCard = (id) => ({
    type: actionTypes.ADD_TO_CARD,
    payload: id
})

export const SetVisite = (value) => ({
    type: actionTypes.SET_VISITE,
    payload: value
})

export const SetOrder = (value) => ({
    type: actionTypes.SET_ORDER,
    payload: value
})

export const SetPayment = (value) => ({
    type: actionTypes.SET_PAYMENT,
    payload: value
})