import { useState } from 'react'
import { didFromDate } from '../lib/date'
import { getNewNote } from '../lib/note'
import Note, { defaultNote } from '../lib/note'

const useNewNotes = (userId: string, curDate: Date) => {
  const [newNotes, setNewNotes] = useState<Note[]>([])
  const [newNoteNum, setNewNoteNum] = useState<number>(
    parseInt(didFromDate(curDate).toString() + 1)
  )
  const note: Note = {
    ...defaultNote,
    user: userId,
    newNoteNum,
    assignedTime: curDate.getTime(),
  }
  const addNewNote = (): number => {
    setNewNoteNum(newNoteNum + 1)
    setNewNotes((prev) => [getNewNote(note), ...prev])
    return newNoteNum
  }

  const removeNewNote = ({ newNoteNum }: Note): number => {
    if (newNoteNum) {
      setNewNotes((prev) => prev.filter((n) => n.newNoteNum !== newNoteNum))
      return newNoteNum
    }
    return 0
  }

  return [newNotes, addNewNote, removeNewNote] as const
}

export default useNewNotes
