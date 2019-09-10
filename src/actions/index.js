import { createAction } from "redux-starter-kit";

// User Actions
export const SIGN_IN = createAction("user/sign-in");
export const SIGN_IN_ERROR = createAction("user/sign-in-error");
export const SIGN_OUT = createAction("user/sign-in");
export const SIGN_OUT_ERROR = createAction("user/sign-out-error");
export const FIRST_LOAD = createAction("user/first-load");
export const GET_USER_FROM_FIRESTORE = createAction("user/get-user-from-firestore");

// Shop List Actions
export const SET_ALL_SHOPS = createAction("shops/set-all-shops");

// Single Shop Actions
export const SET_SHOP = createAction("shop/get-shop");

// Cart Actions

export const ADD_TO_CART = createAction("cart/add/item");
export const REMOVE_FROM_CART = createAction("cart/remove/item");