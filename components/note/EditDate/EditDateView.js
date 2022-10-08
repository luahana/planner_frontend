import React from 'react'
import { useState } from 'react'
import { getCalDates } from '../../../lib/calendar'
import { midFromDate } from '../../../lib/date'
import { useEffect } from 'react'
import Header from './Header'
import Calendar from '../../calendar/Calendar'
import styles from './edit_date_view.module.css'

const EditDateView = ({
  view,
  note,
  removeNewNote,
  oneLoading,
  setOneLoading,
  openCal,
}) => {
  const curDate = new Date(note.assignedTime)

  const [selectedDids, setSelectedDids] = useState([])
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
        oneLoading={oneLoading}
        setOneLoading={setOneLoading}
        openCal={openCal}
        selectedDids={selectedDids}
        setSelectedDids={setSelectedDids}
      />
      <Calendar
        view='editDate'
        calDates={calDates}
        setSelectedDids={setSelectedDids}
        selectedDids={selectedDids}
        mid={curMid}
        curDate={curDate}
      />
    </div>
  )
}

export default EditDateView
