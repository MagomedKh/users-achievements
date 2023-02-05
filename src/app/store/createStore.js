import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./orders";
import statusesReducer from "./statuses";
import usersReducer from "./users";

const rootReducer = combineReducers({ users: usersReducer, statuses: statusesReducer, orders: ordersReducer })

export function createStore() {
   return configureStore({ reducer: rootReducer })
}