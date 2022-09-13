import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

const notesAdapter = createEntityAdapter({})

const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: '/notes',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      keepUnusedDataFor: 5, //5sec for dev might change to 60 for prod
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((user) => {
          user.id = user._id
          return user
        })
        return notesAdapter.setAll(initialState, loadedNotes)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Note', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Note', id })),
          ]
        } else return [{ type: 'Note', id: 'LIST' }]
      },
    }),
    addNewNote: builder.mutation({
      query(body) {
        return { url: '/notes', method: 'POST', body }
      },
      invalidatesTags: [{ type: 'Note', id: 'LIST' }],
    }),
  }),
})

export const { useGetNotesQuery, useAddNewNoteMutation } = notesApiSlice

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data
)

export const {
  selectAll: selectAllNotes,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = notesAdapter.getSelectors((state) => selectNotesData(state) ?? initialState)
