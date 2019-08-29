import {createReducer} from "redux-starter-kit";

import {
    SIGN_IN, 
    FIRST_LOAD,
    SET_ALL_SHOPS,
    SET_SHOP
} from "../actions"

import firebase from "../components/firebase/firebase";

const initialState = {
    user: undefined,
    token: undefined,
    authenticated: false,
    firstLoad: false
}

export const userReducer = createReducer(initialState, {
    [SIGN_IN]: (state, { payload }) => {
        console.log(payload);
        return {
            ...state,
            authenticated: true,
            user: payload.user,
            token: payload.token
        };
    },
    [FIRST_LOAD]: (state) => {
        return {
            ...state,
            firstLoad: true
        }
    }
});

const initialShopsState = {
    locations: []
}

export const shopsReducer = createReducer(initialShopsState, { 
    
    [SET_ALL_SHOPS]: (state, { payload }) => {
        console.log(payload);
        return {
            ...state, 
            locations: payload
        }
    }
});

const singleShopState = {
    shop: {}
}

export const singleShopReducer = createReducer(singleShopState, { 
    
    [SET_SHOP]: (state, { payload }) => {
        return {
            ...state, 
            shop: payload
        }
    }
});

