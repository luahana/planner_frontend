import React, { useState } from 'react'
import { useGetNoteByUserDateQuery } from '../../../redux/slice/api/notesApiSlice'
import NotesViewer from './notesViewer/NotesViewer'
import Note from '../../note/Note'
import { getNewNote, sortedNotesWithNewNotes } from '../../../lib/note'
import { ymdFromDate } from '../../../lib/date'
import ClipLoader from 'react-spinners/ClipLoader'

const Notes = ({ userId, curDate, weekday }) => {
  const { year, month, date } = ymdFromDate(curDate)

  const { data, isLoading, isSuccess, isError, error } =
    useGetNoteByUserDateQuery({ userId, year, month, date })

  const [newNotes, setNewNotes] = useState([])
  const [newNoteNum, setNewNoteNum] = useState(1)

  const onAddNewClicked = async () => {
    const newNote = getNewNote({
      user: userId,
      newNoteNum,
      assignedTime: curDate.getTime(),
    })
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
    const notes = data.ids.map((id) => data.entities[id])
    const notesWithNew = sortedNotesWithNewNotes(newNotes, notes)
    content = notesWithNew.map((note) => (
      <Note
        key={note._id ? note._id : note.newNoteNum}
        note={note}
        curDate={curDate}
        setNewNotes={setNewNotes}
      />
    ))
  }

  return (
    <NotesViewer
      curDate={curDate}
      weekday={weekday}
      content={content}
      onAddNewClicked={onAddNewClicked}
    />
  )
}

export default Notes
