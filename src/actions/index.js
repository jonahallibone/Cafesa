import { createAction } from "redux-starter-kit";

export const SIGN_IN = createAction("user/sign-in");
export const SIGN_IN_ERROR = createAction("user/sign-in-error")
export const FIRST_LOAD = createAction("user/first-load")