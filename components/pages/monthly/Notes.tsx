import React from 'react'
import { useGetNoteByUserDateQuery } from '../../../redux/slice/api/notesApiSlice'
import NotesMonthView from './NotesMonthView'
import { ymdFromDate } from '../../../lib/date'
import ClipLoader from 'react-spinners/ClipLoader'
import useUserAuth from '../../../hooks/useUserAuth'

const Notes = ({ view, curDate }) => {
  const userId = useUserAuth()
  const { year, month, date } = ymdFromDate(curDate)

  const { data, isLoading, isSuccess, isError, error } =
    useGetNoteByUserDateQuery({ userId, year, month, date })

  let content: React.ReactNode
  if (isLoading)
    content = <ClipLoader color='aqua' aria-label='Loading Spinner' />
  if (isSuccess) {
    const notes = data.ids.map((id) => data.entities[id])
    if (view === 'month') content = <NotesMonthView view='' notes={notes} />
    if (view === 'monthSmall')
      content = <NotesMonthView view='monthSmall' notes={notes} />
  }

  return <>{content}</>
}

export default Notes
