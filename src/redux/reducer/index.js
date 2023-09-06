import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import authReducer from "./authReducer";

const reducer = combineReducers({
	products: productsReducer,
	auth: authReducer,
});

export default reducer;
