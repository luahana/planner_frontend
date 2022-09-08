import {
  createApi,
  fetchBaseQuery,
  getchBaseQuery,
} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  tagTypes: ['Notes', 'Users'],
  endpoints: (builder) => ({}),
})
