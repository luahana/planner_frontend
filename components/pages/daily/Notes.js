import React from 'react'
import { useGetNoteByUserDateQuery } from '../../../redux/slice/api/notesApiSlice'
import NotesViewer from './NotesViewer'
import Note from '../../note/Note'
import { sortedNotesFromNormData } from '../../../lib/note'
import { ymdFromDate } from '../../../lib/date'
import ClipLoader from 'react-spinners/ClipLoader'
import useNewNotes from '../../../hooks/useNewNotes'

const Notes = ({ userId, curDate }) => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetNoteByUserDateQuery({ userId, ...ymdFromDate(curDate) })
  const [newNotes, addNewNote, removeNewNotes] = useNewNotes(userId, curDate)

  let content
  if (isLoading) {
    return <ClipLoader color='aqua' size={100} aria-label='Loading Spinner' />
  }
  if (isSuccess) {
    const notesWithNew = sortedNotesFromNormData(newNotes, data)
    content = notesWithNew.map((note) => (
      <Note
        key={note._id ? note._id : note.newNoteNum}
        note={note}
        curDate={curDate}
        removeNewNotes={removeNewNotes}
      />
    ))
  }

  return <NotesViewer content={content} addNewNote={addNewNote} />
}

export default Notes
