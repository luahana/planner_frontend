import React, { useState } from 'react'
import { useGetNoteByUserDateQuery } from '../../redux/slice/api/notesApiSlice'
import NotesDayView from './NotesDayView'
import NotesWeekView from './NotesWeekView'
import NotesMonthView from './NotesMonthView'
import NotesUnassignedView from './NotesUnassignedView'
import Note from './Note'
import ClipLoader from 'react-spinners/ClipLoader'

const DayNotes = ({ view, userId, fullDay, weekday }) => {
  const dt = new Date(fullDay)
  const year = dt.getFullYear()
  const month = (dt.getMonth() + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  })
  const date = dt.getDate().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  })

  const { data, isLoading, isSuccess, isError, error } =
    useGetNoteByUserDateQuery({ userId, year, month, date })

  const [newNotes, setNewNotes] = useState([])
  const [newNoteNum, setNewNoteNum] = useState(1)

  const onAddNewClicked = async (year, month, date) => {
    const newNote = {
      newNoteNum,
      user: userId,
      title: '',
      content: '',
      completed: false,
      sets: [],
      assignedDate: dt,
    }
    setNewNoteNum(newNoteNum + 1)
    setNewNotes((prev) => [newNote, ...prev])
  }

  let content = []
  let loadingComp = (
    <ClipLoader color='aqua' size={100} aria-label='Loading Spinner' />
  )
  if (isLoading) {
    content = (
      <ClipLoader color='aqua' size={100} aria-label='Loading Spinner' />
    )
  }
  if (isSuccess) {
    const notes = data.ids.map((id) => data.entities[id])
    const notesByCompleted = notes
      .sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      .sort((a, b) => {
        if (a.completed === b.completed) return 0
        if (a.completed) return 1
        if (!a.completed) return -1
      })
    const notesWithNew = [...newNotes, ...notesByCompleted]
    content = notesWithNew.map((note) => (
      <Note
        key={note._id ? note._id : note.newNoteNum}
        userId={userId}
        note={note}
        year={year}
        month={month}
        fullDay={fullDay}
        setNewNotes={setNewNotes}
      />
    ))
    if (view === 'month' || view === 'monthSmall') {
      content = notesWithNew
    }
    if (view === 'unassigned') {
      content = notesWithNew.map((note) => (
        <Note
          view='unassigned'
          key={note._id}
          userId={userId}
          note={note}
          year={year}
          month={month}
          fullDay={fullDay}
          setNewNotes={setNewNotes}
        />
      ))
    }
  }

  return (
    <>
      {view === 'day' && (
        <NotesDayView
          fullDay={fullDay}
          content={content}
          onAddNewClicked={onAddNewClicked}
          loadingComp={loadingComp}
          loading={isLoading}
        />
      )}
      {view === 'week' && (
        <NotesWeekView
          fullDay={fullDay}
          weekday={weekday}
          content={content}
          onAddNewClicked={onAddNewClicked}
          loadingComp={loadingComp}
          loading={isLoading}
        />
      )}
      {view === 'month' && (
        <NotesMonthView content={content} loading={isLoading} />
      )}
      {view === 'monthSmall' && (
        <NotesMonthView
          view='monthSmall'
          content={content}
          loading={isLoading}
        />
      )}
      {view === 'unassigned' && (
        <NotesUnassignedView
          content={content}
          onAddNewClicked={onAddNewClicked}
          loadingComp={loadingComp}
          loading={isLoading}
        />
      )}
    </>
  )
}

export default DayNotes
