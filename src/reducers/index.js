import {createReducer} from "redux-starter-kit";
import {SIGN_IN, FIRST_LOAD} from "../actions"

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
