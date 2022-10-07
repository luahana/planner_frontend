import React, { useState } from 'react'
import { useGetUnassignedNoteByUserQuery } from '../../../redux/slice/api/notesApiSlice'
import NotesViewer from './NotesViewer'
import Note from '../../note/Note'
import ClipLoader from 'react-spinners/ClipLoader'
import { getNewNote, sortedNotesWithNewNotes } from '../../../lib/note'

const Notes = ({ userId }) => {
  const {
    data: unassignedNotes,
    isLoading,
    isSuccess,
  } = useGetUnassignedNoteByUserQuery({ userId })

  const [newNotes, setNewNotes] = useState([])
  const [newNoteNum, setNewNoteNum] = useState(1)

  const onAddNewClicked = async () => {
    const newNote = getNewNote({ user: userId, newNoteNum, assignedTime: 0 })

    setNewNoteNum(newNoteNum + 1)
    setNewNotes((prev) => [newNote, ...prev])
  }

  let content
  if (isLoading) {
    content = (
      <ClipLoader color='aqua' size={100} aria-label='Loading Spinner' />
    )
  }
  if (isSuccess) {
    const notes = unassignedNotes.ids.map((id) => unassignedNotes.entities[id])
    const notesWithNew = sortedNotesWithNewNotes(newNotes, notes)

    content = notesWithNew.map((note) => (
      <Note
        view='unassigned'
        key={note._id ? note._id : note.newNoteNum}
        userId={userId}
        note={note}
        curDate={new Date(0)}
        setNewNotes={setNewNotes}
      />
    ))
  }

  return <NotesViewer content={content} onAddNewClicked={onAddNewClicked} />
}

export default Notes
