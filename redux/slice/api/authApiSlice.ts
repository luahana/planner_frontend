import { apiSlice } from './apiSlice'
import { logOut } from '../authSlice'
import { setCredentials } from '../authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query(tokenStr) {
        return {
          url: '/auth',
          method: 'POST',
          body: { ...tokenStr },
        }
      },
    }),
    googleLogin: builder.mutation({
      query(credentials) {
        return {
          url: '/auth/googlelogin',
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
      async onQueryStarted(arg: void, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { accessToken } = data
          dispatch(setCredentials({ accessToken }))
        } catch (err) {
          console.log(err)
        }
      },
    }),
  }),
})

export const {
  useGoogleLoginMutation,
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = authApiSlice
