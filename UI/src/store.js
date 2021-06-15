import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

// TODO: Remove trace:true because it affects performance a lot

const options = { trace: false };

const composeEnhancers = composeWithDevTools(options);

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
  // composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
