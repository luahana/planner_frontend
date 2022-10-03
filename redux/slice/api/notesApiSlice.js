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
    }),
    getNoteByUserMonth: builder.query({
      query: (queryStr) => ({
        url: `/notes/${queryStr.userId}/${queryStr.year}/${queryStr.month}`,
      }),
      providesTags: [{ type: 'Notes', id: 'LIST' }],
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
      invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
    }),
    updateNote: builder.mutation({
      query({
        _id,
        user,
        title = '',
        content = '',
        completed = false,
        assignedDate = '',
        sets = [],
      }) {
        return {
          url: '/notes',
          method: 'PUT',
          body: { _id, user, title, content, completed, assignedDate, sets },
        }
      },
      invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
    }),
    deleteNote: builder.mutation({
      query(body) {
        return {
          url: '/notes',
          method: 'DELETE',
          body,
        }
      },
      // async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
      //   console.log('asdf')
      //   const patchResult = dispatch(
      //     apiSlice.util.updateQueryData(
      //       'getNoteByUserMonth',
      //       undefined,
      //       (draft) => {
      //         draft = draft.filter((note) => note.id !== id)
      //       }
      //     )
      //   )
      //   try {
      //     console.log('asdf')
      //     await queryFulfilled
      //   } catch {
      //     patchResult.undo()
      //   }
      // },
      invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetNotesQuery,
  useGetNoteByUserMonthQuery,
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
