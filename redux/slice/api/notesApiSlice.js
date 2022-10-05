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
      query: ({ userId, year, month, date }) => {
        const fromTime = new Date(year, month - 1, date, 0, 0, 0).getTime()
        const toTime = new Date(
          year,
          month - 1,
          date,
          23,
          59,
          59,
          999
        ).getTime()

        return {
          url: `/notes/${userId}/${fromTime}/${toTime}`,
        }
      },
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((note) => {
          note.id = note._id
          return note
        })
        return notesAdapter.setAll(initialState, loadedNotes)
      },
      providesTags: (result, error, arg) => {
        const did = convertYmdToDid(arg.year, arg.month, arg.date)
        return [{ type: 'Notes', id: did }]
      },
    }),
    getUnassignedNoteByUser: builder.query({
      query: ({ userId }) => {
        return {
          url: `/notes/${userId}/unassigned`,
        }
      },
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((note) => {
          note.id = note._id
          return note
        })
        return notesAdapter.setAll(initialState, loadedNotes)
      },
      providesTags: [{ type: 'Notes', id: convertDateToDid(new Date(0)) }],
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
        assignedTime = 0,
        assigned,
        sets = [],
      }) {
        return {
          url: '/notes',
          method: 'PUT',
          body: {
            _id,
            user,
            title,
            content,
            completed,
            assignedTime,
            assigned,
            sets,
          },
        }
      },
      invalidatesTags: (result, error, arg) => {
        const assignedDid = convertDateToDid(new Date(arg.assignedTime))
        if (!arg.curDate) {
          return [{ type: 'Notes', id: assignedDid }]
        }

        const curDid = convertDateToDid(new Date(arg.curDate))
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
  useGetUnassignedNoteByUserQuery,
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
