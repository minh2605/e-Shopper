import wishListReducer from "./wishlist.js";
import cartReducer from "./Cart.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  wishList: wishListReducer,
  cart: cartReducer,
});

export default rootReducer;
