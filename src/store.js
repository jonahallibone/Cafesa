import { configureStore } from "redux-starter-kit";
import {
    userReducer, 
    shopsReducer,
    singleShopReducer,
    shoppingCartReducer
} from "./reducers";


const reducer = {
    user: userReducer,
    shops: shopsReducer,
    shop: singleShopReducer,
    cart: shoppingCartReducer
}

export const store = configureStore({
    reducer: reducer
});