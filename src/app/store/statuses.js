import { createSlice } from "@reduxjs/toolkit";
import fetchStatuses from "../fake.api/statuses.api";

const initialState = {
   entities: null,
   isLoaded: false,
   error: null,
}

const statusesSlice = createSlice({
   name: 'statuses',
   initialState,
   reducers: {
      statusesRequested(state) {
         state.isLoaded = false
      },
      statusesReceved(state, action) {
         state.entities = action.payload
         state.dataLoaded = true
         state.isLoaded = true
      },
      statusesRequestFailed(state, action) {
         state.error = action.payload
         state.isLoaded = true
      },
   }
})

const { reducer: statusesReducer, actions } = statusesSlice
const { statusesRequested, statusesReceved, statusesRequestFailed } = actions


export const loadStatusesList = () => async (dispatch) => {
   dispatch(statusesRequested())
   try {
      const statuses = await fetchStatuses()
      dispatch(statusesReceved(statuses))
   } catch (error) {
      dispatch(statusesRequestFailed(error.message))
   }
}

export const getStatusesList = () => state => state.statuses.entities
export const getStatusesLoadedStatus = () => state => state.statuses.isLoaded

export default statusesReducer
