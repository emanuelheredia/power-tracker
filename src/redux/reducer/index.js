import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";

const reducer = combineReducers({
	products: productsReducer,
	auth: authReducer,
	cart: cartReducer,
});

export default reducer;
