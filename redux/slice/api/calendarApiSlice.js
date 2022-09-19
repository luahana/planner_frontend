import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

const calendarAdapter = createEntityAdapter({})

const initialState = calendarAdapter.getInitialState()

export const calendarApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCalendar: builder.query({
      query: () => ({
        url: '/calendar',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),

      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Calendar', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Calendar', id })),
          ]
        } else return [{ type: 'Calendar', id: 'LIST' }]
      },
    }),
    addCalendar: builder.mutation({
      query(body) {
        return { url: '/calendar', method: 'POST', body }
      },
      invalidatesTags: [{ type: 'Calendar', id: 'LIST' }],
    }),
    updateCalendar: builder.mutation({
      query(data) {
        const { id, ...body } = data
        return {
          url: `/calendar/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Calendar', id: arg.id },
      ],
    }),
    deleteCalendar: builder.mutation({
      query({ id }) {
        return {
          url: '/calendar',
          method: 'DELETE',
          body: { id },
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Calendar', id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetCalendarQuery,
  useAddCalendarMutation,
  useUpdateCalendarMutation,
  useDeleteCalendarMutation,
} = calendarApiSlice

export const selectCalendarResult =
  calendarApiSlice.endpoints.getCalendar.select()

const selectCalendarData = createSelector(
  selectCalendarResult,
  (calendarResult) => calendarResult.data
)

export const {
  selectAll: selectAllCalendar,
  selectById: selectCalendarById,
  selectIds: selectCalendarIds,
} = calendarAdapter.getSelectors(
  (state) => selectCalendarData(state) ?? initialState
)
