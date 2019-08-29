import { configureStore } from "redux-starter-kit";
import {
    userReducer, 
    shopsReducer,
    singleShopReducer
} from "./reducers";


const reducer = {
    user: userReducer,
    shops: shopsReducer,
    shop: singleShopReducer
}

export const store = configureStore({
    reducer: reducer
});