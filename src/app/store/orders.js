import { createSlice } from "@reduxjs/toolkit";
import fetchOrders from "../fake.api/orders.api";

const initialState = {
   entities: null,
   isLoaded: false,
   error: null,
}

const ordersSlice = createSlice({
   name: 'orders',
   initialState,
   reducers: {
      ordersRequested(state) {
         state.isLoaded = false
      },
      ordersReceved(state, action) {
         state.entities = action.payload
         state.dataLoaded = true
         state.isLoaded = true
      },
      ordersRequestFailed(state, action) {
         state.error = action.payload
         state.isLoaded = true
      },
   }
})

const { reducer: ordersReducer, actions } = ordersSlice
const { ordersRequested, ordersReceved, ordersRequestFailed } = actions


export const loadOrdersList = () => async (dispatch) => {
   dispatch(ordersRequested())
   try {
      const orders = await fetchOrders()
      dispatch(ordersReceved(orders))
   } catch (error) {
      dispatch(ordersRequestFailed(error.message))
   }
}

export const getOrdersList = () => state => state.orders.entities
export const getOrdersLoadedStatus = () => state => state.orders.isLoaded


export default ordersReducer
