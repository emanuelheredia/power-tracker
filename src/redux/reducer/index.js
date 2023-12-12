import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import newsReducer from "./newsReducer";
import accessorieImagesReducer from "./accessorieImagesReducer";
import usersReducer from "./userReducer";

const reducer = combineReducers({
	products: productsReducer,
	auth: authReducer,
	cart: cartReducer,
	news: newsReducer,
	accesoriesImages: accessorieImagesReducer,
	users: usersReducer,
});

export default reducer;
