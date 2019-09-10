import {createReducer} from "redux-starter-kit";

import {
    SIGN_IN, 
    FIRST_LOAD,
    SET_ALL_SHOPS,
    SET_SHOP,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    GET_USER_FROM_FIRESTORE
} from "../actions"

const initialState = {
    user: undefined,
    token: undefined,
    authenticated: false,
    firstLoad: false,
    subscription: {},
    fetching: true
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
    },
    [GET_USER_FROM_FIRESTORE]: (state, { payload }) => {
        console.log(payload)
        return {
            ...state,
            fetching: false,
            subscription: payload.subscription
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

const shoppingCartState = { 
    items: {},
    is_empty: true,
    lastUpdated: Date.now(),
}

export const shoppingCartReducer = createReducer(shoppingCartState, {
    [ADD_TO_CART]: (state, { payload }) => {
        console.log(payload)
        return {
            ...state,
            items: payload,
            is_empty: false,
            lastUpdated: Date.now()
        }
    },
    [REMOVE_FROM_CART]: (state) => {
        return {
            ...state,
            items: {},
            is_empty: true,
            lastUpdated: Date.now()
        }
    }
});
