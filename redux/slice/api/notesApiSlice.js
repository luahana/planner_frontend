import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import {
  convertDateStrToDid,
  convertDateToDid,
  convertYmdToDid,
} from '../../../lib/calendar'
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
    }),
    getNoteByUserMonth: builder.query({
      query: (queryStr) => ({
        url: `/notes/${queryStr.userId}/${queryStr.year}/${queryStr.month}`,
      }),

      providesTags: [{ type: 'Notes', id: 'LIST' }],
    }),
    getNoteByUserDate: builder.query({
      query: ({ userId, year, month, date }) => ({
        url: `/notes/${userId}/${year}/${month}/${date}`,
      }),
      transformResponse: (responseData) => {
        console.log('responseData')
        console.log(responseData)
        const loadedNotes = responseData.map((note) => {
          note.id = note._id
          return note
        })
        return notesAdapter.setAll(initialState, loadedNotes)
      },
      providesTags: (result, error, arg) => {
        const did = convertYmdToDid(arg.year, arg.month, arg.date)
        return [
          { type: 'Notes', id: 'LIST' },
          { type: 'Notes', id: did },
        ]
      },
    }),
    addNewNote: builder.mutation({
      query({
        user,
        title = '',
        content = '',
        completed = false,
        assignedDate = new Date(),
        sets = [],
      }) {
        return {
          url: '/notes',
          method: 'POST',
          body: { user, title, content, completed, assignedDate, sets },
        }
      },
      invalidatesTags: (result, error, arg) => {
        const did = convertDateStrToDid(arg.assignedDate.toDateString())

        return [{ type: 'Notes', id: did }]
      },
    }),
    updateNote: builder.mutation({
      query({
        _id,
        user,
        title = '',
        content = '',
        completed = false,
        curDate,
        assignedDate = '',
        sets = [],
      }) {
        return {
          url: '/notes',
          method: 'PUT',
          body: { _id, user, title, content, completed, assignedDate, sets },
        }
      },
      invalidatesTags: (result, error, arg) => {
        const assignedDid = convertDateToDid(arg.assignedDate)
        if (!arg.curDate) {
          return [{ type: 'Notes', id: assignedDid }]
        }

        const curDid = convertDateToDid(arg.curDate)
        return [
          { type: 'Notes', id: curDid },
          { type: 'Notes', id: assignedDid },
        ]
      },
    }),
    deleteNote: builder.mutation({
      query({ id }) {
        return {
          url: '/notes',
          method: 'DELETE',
          body: { id },
        }
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: 'Notes', id: arg.did }]
      },
    }),
  }),
})

export const {
  useGetNotesQuery,
  useGetNoteByUserMonthQuery,
  useGetNoteByUserDateQuery,
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
