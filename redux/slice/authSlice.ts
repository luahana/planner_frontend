import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload
      state.token = accessToken
    },
    logOut: (state, action: { payload: void }) => {
      state.token = null
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: RootState) => state.auth.token
