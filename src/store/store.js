import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import usersReducer from "./users-reducer";
import thunkMiddleware from "redux-thunk";
import registrationReducer from "./registration-reducer";

let reducers = combineReducers({
    usersPage: usersReducer,
    registrationPage: registrationReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));