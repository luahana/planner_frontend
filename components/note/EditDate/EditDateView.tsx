import React from 'react'
import { useState } from 'react'
import { getCalDates } from '../../../lib/calendar'
import { midFromDate } from '../../../lib/date'
import { useEffect } from 'react'
import Header from './header/Header'
import Calendar from '../../calendar/Calendar'
import styles from './edit_date_view.module.css'
import Note from '../../../lib/note'

type Props = {
  view: string
  note: Note
  removeNewNote: (newNote: Note) => string
}

const EditDateView = ({ view, note, removeNewNote }: Props) => {
  const curDate: Date = new Date(note.assignedTime)

  const [curMid, setCurMid] = useState<string>(midFromDate(curDate))
  const [calDates, setCalDates] = useState<string[]>(getCalDates(curMid))

  useEffect(() => {
    if (view === 'unassigned') {
      setCurMid(midFromDate(new Date()))
    }
  }, [])

  useEffect(() => {
    setCalDates(getCalDates(curMid))
  }, [curMid])

  return (
    <div className={styles.wrapper}>
      <Header
        note={note}
        curMid={curMid}
        setCurMid={setCurMid}
        removeNewNote={removeNewNote}
      />
      <Calendar view='editDate' note={note} calDates={calDates} mid={curMid} />
    </div>
  )
}

export default EditDateView
