import { useState } from 'react'
import { didFromDate } from '../lib/date'
import { getNewNote } from '../lib/note'
import Note, { defaultNote } from '../lib/note'

const useNewNotes = (userId: string, curDate: Date) => {
  const [newNotes, setNewNotes] = useState<Note[]>([])
  const [newNoteId, setNewNoteId] = useState<string>(
    parseInt(didFromDate(curDate).toString() + 1).toString()
  )
  const note: Note = {
    ...defaultNote,
    user: userId,
    newNoteId,
    assignedTime: curDate.getTime(),
  }
  const addNewNote = (): string => {
    setNewNoteId((parseInt(newNoteId) + 1).toString())
    setNewNotes((prev) => [getNewNote(note), ...prev])
    return newNoteId
  }

  const removeNewNote = ({ newNoteId }: Note): string => {
    if (newNoteId) {
      setNewNotes((prev) => prev.filter((n) => n.newNoteId !== newNoteId))
      return newNoteId
    }
    return ''
  }

  return [newNotes, addNewNote, removeNewNote] as const
}

export default useNewNotes
