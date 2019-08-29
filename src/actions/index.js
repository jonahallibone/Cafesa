import { createAction } from "redux-starter-kit";

// User Actions
export const SIGN_IN = createAction("user/sign-in");
export const SIGN_IN_ERROR = createAction("user/sign-in-error");
export const FIRST_LOAD = createAction("user/first-load");


// Shop List Actions
export const SET_ALL_SHOPS = createAction("shops/set-all-shops");

// Single Shop Actions
export const SET_SHOP = createAction("shop/get-shop");
