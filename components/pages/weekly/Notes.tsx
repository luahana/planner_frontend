import React from 'react'
import { useGetNoteByUserDateQuery } from '../../../redux/slice/api/notesApiSlice'
import NotesViewer from './notesViewer/NotesViewer'
import Note from '../../note/Note'
import { sortedNotesFromNormData } from '../../../lib/note'
import { ymd, ymdFromDate } from '../../../lib/date'
import ClipLoader from 'react-spinners/ClipLoader'
import useNewNotes from '../../../hooks/useNewNotes'

type Props = {
  userId: string
  curDate: Date
  weekday: number
}

const Notes = ({ userId, curDate, weekday }: Props) => {
  const { year, month, date }: ymd = ymdFromDate(curDate)

  const { data, isLoading, isSuccess, isError, error } =
    useGetNoteByUserDateQuery({ userId, year, month, date })

  const [newNotes, addNewNote, removeNewNote] = useNewNotes(userId, curDate)

  let content: React.ReactNode
  if (isLoading) {
    return <ClipLoader color='aqua' size={100} aria-label='Loading Spinner' />
  }

  if (isSuccess) {
    const notesWithNew = sortedNotesFromNormData(newNotes, data)
    content = notesWithNew.map((note) => (
      <Note
        key={note.id ? note.id : note.newNoteId}
        note={note}
        removeNewNote={removeNewNote}
      />
    ))
  }

  return (
    <NotesViewer
      curDate={curDate}
      weekday={weekday}
      content={content}
      addNewNote={addNewNote}
    />
  )
}

export default Notes
