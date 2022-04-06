import loggedUserDataReducer from "./LoggedUserData";
import productIdReducer from "./ProductId";
import pageLinkReducer from "./PageLink";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  loggedUserData: loggedUserDataReducer,
  productId: productIdReducer,
  pageLink: pageLinkReducer,
});

export default allReducers;
