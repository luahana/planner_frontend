import { createEntityAdapter } from '@reduxjs/toolkit'
import { didFromDateStr, didFromDate, didFromYmd } from '../../../lib/date'
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
        const did = didFromYmd({
          year: arg.year,
          month: arg.month,
          date: arg.date,
        })
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
      providesTags: [{ type: 'Notes', id: didFromDate(new Date(0)) }],
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
        const did = didFromDateStr(arg.assignedDate.toDateString())

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
        const assignedDid = didFromDate(new Date(arg.assignedTime))
        if (!arg.assigned) {
          return [{ type: 'Notes', id: didFromDate(new Date(0)) }]
        }
        if (arg.curDate === undefined) {
          return [{ type: 'Notes', id: assignedDid }]
        }
        const curDid = didFromDate(new Date(arg.curDate))
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
