import React from 'react'
import {
  useGetNoteByUserMonthQuery,
  useAddNewNoteMutation,
} from '../../redux/slice/api/notesApiSlice'
import NotesDayView from './NotesDayView'
import NotesWeekView from './NotesWeekView'
import NotesMonthView from './NotesMonthView'
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

  const onAddNewClicked = async () => {
    await addNewNote({
      user: userId,
      assignedDate: new Date(year, month, date),
    })
  }

  let content = notes.map((note) => (
    <Note
      key={note._id}
      userId={userId}
      noteId={note._id}
      year={year}
      month={month}
    />
  ))
  if (view === 'month') {
    content = notes.map((note) => note.title)
  }

  return (
    <>
      {view === 'day' && (
        <NotesDayView content={content} onAddNewClicked={onAddNewClicked} />
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
    </>
  )
}

export default DayNotes
