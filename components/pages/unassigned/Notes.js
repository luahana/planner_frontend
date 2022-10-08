import React from 'react'
import { useGetUnassignedNoteByUserQuery } from '../../../redux/slice/api/notesApiSlice'
import NotesViewer from './NotesViewer'
import Note from '../../note/Note'
import ClipLoader from 'react-spinners/ClipLoader'
import { sortedNotesFromNormData } from '../../../lib/note'
import useNewNotes from '../../../hooks/useNewNotes'

const Notes = ({ userId }) => {
  const { data, isLoading, isSuccess } = useGetUnassignedNoteByUserQuery({
    userId,
  })

  const [newNotes, addNewNote, removeNewNote] = useNewNotes(userId, new Date(0))

  let content
  if (isLoading) {
    return <ClipLoader color='aqua' size={100} aria-label='Loading Spinner' />
  }

  if (isSuccess) {
    const notesWithNew = sortedNotesFromNormData(newNotes, data)
    content = notesWithNew.map((note) => (
      <Note
        key={note._id ? note._id : note.newNoteNum}
        view='unassigned'
        userId={userId}
        note={note}
        removeNewNote={removeNewNote}
      />
    ))
  }

  return <NotesViewer content={content} addNewNote={addNewNote} />
}

export default Notes
