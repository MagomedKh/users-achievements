import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../api/fake.api/users.api";

const initialState = {
   entities: null,
   isLoaded: false,
   error: null,
}

const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      usersRequested(state) {
         state.isLoaded = false
      },
      usersReceved(state, action) {
         state.entities = action.payload
         state.dataLoaded = true
         state.isLoaded = true
      },
      usersRequestFailed(state, action) {
         state.error = action.payload
         state.isLoaded = true
      },
   }
})

const { reducer: usersReducer, actions } = usersSlice
const { usersRequested, usersReceved, usersRequestFailed } = actions


export const loadUsersList = () => async (dispatch) => {
   dispatch(usersRequested())
   try {
      const users = await fetchUsers()
      dispatch(usersReceved(users))
   } catch (error) {
      dispatch(usersRequestFailed(error.message))
   }
}

export const getUsersList = () => state => state.users.entities
export const getUsersLoadedStatus = () => state => state.users.isLoaded

export default usersReducer
