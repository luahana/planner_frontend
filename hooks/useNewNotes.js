import { useState } from 'react'
import { getNewNote } from '../lib/note'

const useNewNotes = (userId, curDate) => {
  const [newNotes, setNewNotes] = useState([])
  const [newNoteNum, setNewNoteNum] = useState(1)

  const addNewNote = (
    newNote = getNewNote({
      user: userId,
      newNoteNum,
      assignedTime: curDate.getTime(),
    })
  ) => {
    setNewNoteNum(newNoteNum + 1)
    setNewNotes((prev) => [newNote, ...prev])
    return newNoteNum
  }

  const removeNewNote = ({ newNoteNum }) => {
    if (newNoteNum) {
      setNewNotes((prev) => prev.filter((n) => n.newNoteNum !== newNoteNum))
      return newNoteNum
    }
  }

  return [newNotes, addNewNote, removeNewNote]
}

export default useNewNotes
