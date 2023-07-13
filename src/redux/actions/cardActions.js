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

export const SetStartDate = (date) => ({
    type: actionTypes.SET_START_DATE,
    payload: date
})

export const SetEndDate = (date) => ({
    type: actionTypes.SET_END_DATE,
    payload: date
})

export const SetFilterOn = (value) => ({
    type: actionTypes.SET_FILTER_ON,
    payload: value
})

export const SetIsSheetOpen = (value) => ({
    type: actionTypes.SET_IS_SHEET_OPEN,
    payload: value
})