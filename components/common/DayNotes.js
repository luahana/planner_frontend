import React from 'react'
import {
  useGetNoteByUserMonthQuery,
  useAddNewNoteMutation,
} from '../../redux/slice/api/notesApiSlice'
import NotesDayView from './NotesDayView'
import NotesWeekView from './NotesWeekView'
import NotesMonthView from './NotesMonthView'
import NotesUnassignedView from './NotesUnassignedView'
import Note from './Note'

const DayNotes = ({ view, userId, fullDay, weekday }) => {
  const dt = new Date(fullDay)
  const year = dt.getFullYear()
  const month = dt.getMonth() + 1
  const date = dt.getDate()

  const {
    notes = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetNoteByUserMonthQuery(
    { userId, year, month },
    {
      selectFromResult: ({ data }) => {
        return {
          notes: data?.filter(
            (note) => new Date(note.assignedDate).toDateString() === fullDay
          ),
        }
      },
    }
  )

  const [
    addNewNote,
    {
      isLoading: addIsLoading,
      isSuccess: addIsSuccess,
      isError: addIsError,
      error: addError,
    },
  ] = useAddNewNoteMutation()

  const onAddNewClicked = async (year, month, date) => {
    await addNewNote({
      user: userId,
      assignedDate: new Date(year, month - 1, date),
    })
  }
  const notedByCompleted = notes.sort((a, b) => {
    if (a.completed === b.completed) return 0
    if (a.completed) return 1
    if (!a.completed) return -1
  })

  let content = notedByCompleted.map((note) => (
    <Note
      key={note._id}
      userId={userId}
      noteId={note._id}
      year={year}
      month={month}
      fullDay={fullDay}
    />
  ))
  if (view === 'month') {
    content = notedByCompleted
  }
  if (view === 'unassigned') {
    content = notedByCompleted.map((note) => (
      <Note
        key={note._id}
        userId={userId}
        noteId={note._id}
        year={year}
        month={month}
        fullDay={fullDay}
      />
    ))
  }

  return (
    <>
      {view === 'day' && (
        <NotesDayView
          fullDay={fullDay}
          content={content}
          onAddNewClicked={onAddNewClicked}
        />
      )}
      {view === 'week' && (
        <NotesWeekView
          fullDay={fullDay}
          weekday={weekday}
          content={content}
          onAddNewClicked={onAddNewClicked}
        />
      )}
      {view === 'month' && <NotesMonthView content={content} />}
      {view === 'unassigned' && (
        <NotesUnassignedView
          content={content}
          onAddNewClicked={onAddNewClicked}
        />
      )}
    </>
  )
}

export default DayNotes
