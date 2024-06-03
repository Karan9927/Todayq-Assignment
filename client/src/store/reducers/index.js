import { combineReducers } from "redux";
import cartReducer from "./cartReducer"; // Your cart reducer file

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
