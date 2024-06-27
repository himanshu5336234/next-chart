import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "../reducers";
import { deploymentEnv, envVariable } from "../../api-service/Base";
const middleware = [thunk];
const buildType = envVariable();
const middlewareEnhancer = buildType === deploymentEnv.PROD ? applyMiddleware(...middleware) : composeWithDevTools(applyMiddleware(...middleware));
export default createStore(rootReducer, middlewareEnhancer);
