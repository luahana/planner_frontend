import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const notesSlice = createSlice({
  name: 'notes',
  initialState: {},
  reducers: {
    addNote: (state, action) => {
      const { id, ...rest } = action.payload
      state[id] = { ...rest }
    },
    setIsLoading: (state, action) => {
      const { id, isLoading } = action.payload
      state[id] = { ...state[id], isLoading }
    },
    setModalOpen: (state, action) => {
      const { id, isEditOpen, isCalOpen } = action.payload
      state[id] = { ...state[id], isEditOpen, isCalOpen }
    },
    setModalClose: (state, action) => {
      const { id } = action.payload
      state[id] = { ...state[id], isEditOpen: false, isCalOpen: false }
    },
    setSelectedDids: (state, action) => {
      const { id, selectedDids } = action.payload
      state[id] = {
        ...state[id],
        selectedDids,
      }
    },
  },
})

export const {
  addNote,
  setIsLoading,
  setModalOpen,
  setModalClose,
  setSelectedDids,
} = notesSlice.actions

export default notesSlice.reducer

export const selectNote = (state: RootState, id) =>
  state.notes[id] ?? {
    isLoading: false,
    isEditOpen: false,
    isCalOpen: false,
    selectedDids: [],
  }
