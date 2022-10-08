import { createSlice } from '@reduxjs/toolkit'

const notesSlice = createSlice({
  name: 'notes',
  initialState: {},
  reducers: {
    addNote: (state, action) => {
      const { id, isLoading, isEditOpen, isCalOpen } = action.payload
      state[id] = { isLoading, isEditOpen, isCalOpen }
    },
    setIsLoading: (state, action) => {
      const { id, isLoading } = action.payload
      state[id] = { ...state[id], isLoading }
    },
    setModalOpen: (state, action) => {
      const { id, isEditOpen, isCalOpen } = action.payload
      state[id] = { ...state[id], isEditOpen, isCalOpen }
    },
  },
})

export const { addNote, setIsLoading, setModalOpen } = notesSlice.actions

export default notesSlice.reducer

export const selectCurrentToken = (state) => state.notes.token
