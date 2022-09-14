import { apiSlice } from './apiSlice'
import { logOut } from '../authSlice'
import { setCredentials } from '../authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query(credentials) {
        return {
          url: '/auth',
          method: 'POST',
          body: { ...credentials },
        }
      },
    }),
    sendLogout: builder.mutation({
      query() {
        return {
          url: '/auth/logout',
          method: 'POST',
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(logOut())
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState())
          }, 1000)
        } catch (err) {
          console.log(err)
        }
      },
    }),
    refresh: builder.mutation({
      query() {
        return {
          url: '/auth/refresh',
          method: 'GET',
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          const { accessToken } = data
          dispatch(setCredentials({ accessToken }))
        } catch (err) {
          console.log(err)
        }
      },
    }),
  }),
})

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice
