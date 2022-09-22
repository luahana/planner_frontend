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
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((note) => {
          note.id = note._id
          return note
        })
        return notesAdapter.setAll(initialState, loadedNotes)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Notes', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Notes', id })),
          ]
        } else return [{ type: 'Notes', id: 'LIST' }]
      },
    }),
    getNoteByUserDay: builder.query({
      query: (queryStr) => ({
        url: `/notes/${queryStr}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((note) => {
          note.id = note._id
          return note
        })
        return notesAdapter.setAll(initialState, loadedNotes)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Notes', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Notes', id })),
          ]
        } else return [{ type: 'Notes', id: 'LIST' }]
      },
    }),
    addNewNote: builder.mutation({
      query({
        _id,
        user,
        title,
        content = '',
        completed = false,
        assignedDate = new Date(),
        sets = [],
      }) {
        return {
          url: '/notes',
          method: 'POST',
          body: { _id, user, title, content, completed, assignedDate, sets },
        }
      },
      invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
    }),
    updateNote: builder.mutation({
      query({
        _id,
        user,
        title,
        content = '',
        completed = false,
        assignedDate = new Date(),
        sets = [],
      }) {
        return {
          url: '/notes',
          method: 'PUT',
          body: { _id, user, title, content, completed, assignedDate, sets },
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Notes', id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query(body) {
        return {
          url: '/notes',
          method: 'DELETE',
          body,
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Notes', id: arg.id }],
    }),
  }),
})

export const {
  useGetNotesQuery,
  useGetNoteByUserDayQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice

// export const selectNotesResult = notesApiSlice.endpoints.getNoteByDay.select()

// const selectNotesData = createSelector(
//   selectNotesResult,
//   (notesResult) => notesResult.data
// )

// export const {
//   selectAll: selectAllNotes,
//   selectById: selectNoteById,
//   selectIds: selectNoteIds,
// } = notesAdapter.getSelectors((state) => selectNotesData(state) ?? initialState)
