import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import newsReducer from "./newsReducer";
import accessorieImagesReducer from "./accessorieImagesReducer";

const reducer = combineReducers({
	products: productsReducer,
	auth: authReducer,
	cart: cartReducer,
	news: newsReducer,
	accesoriesImages: accessorieImagesReducer,
});

export default reducer;
