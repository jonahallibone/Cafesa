import { configureStore } from "redux-starter-kit";
import {userReducer} from "./reducers";

const reducer = {
    user: userReducer,
}

export const store = configureStore({
    reducer
});