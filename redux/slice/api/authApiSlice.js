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
          method: 'get',
          // body: { ...credentials },
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
          const ff = await queryFulfilled
          console.log('ff')
          console.log(ff)
          const { accessToken } = ff.data
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
