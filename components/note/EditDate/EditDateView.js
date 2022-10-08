import React from 'react'
import { useState } from 'react'
import { getCalDates } from '../../../lib/calendar'
import { midFromDate } from '../../../lib/date'
import { useEffect } from 'react'
import Header from './Header'
import Calendar from '../../calendar/Calendar'
import styles from './edit_date_view.module.css'

const EditDateView = ({ view, note, removeNewNote }) => {
  const curDate = new Date(note.assignedTime)

  const [curMid, setCurMid] = useState(midFromDate(curDate))
  const [calDates, setCalDates] = useState(getCalDates(curMid))

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
