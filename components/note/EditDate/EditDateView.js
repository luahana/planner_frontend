import React, { useRef } from 'react'
import { useState } from 'react'
import { getCalDates } from '../../../lib/calendar'
import { didFromDate, midFromDate, dateFromDid } from '../../../lib/date'
import { useEffect } from 'react'
import Header from './Header'
import Calendar from '../../calendar/Calendar'
import styles from './edit_date_view.module.css'

const EditDateView = ({
  view,
  curDate,
  handleMove,
  handleCopy,
  setShowCal,
}) => {
  const curDid = didFromDate(curDate)

  const [selectedDid, setSelectedDid] = useState(curDid)
  const [curMid, setCurMid] = useState(midFromDate(curDate))
  const [calDates, setCalDates] = useState(getCalDates(curMid))
  const wrapperRef = useRef()

  useEffect(() => {
    if (view === 'unassigned') {
      setCurMid(midFromDate(new Date()))
    }
    wrapperRef.current.focus()
  }, [])

  useEffect(() => {
    setCalDates(getCalDates(curMid))
  }, [curMid])

  const onMoveClicked = () => {
    handleMove(dateFromDid(selectedDid))
  }
  const onCopyClicked = () => {
    handleCopy(dateFromDid(selectedDid))
  }
  return (
    <div
      className={styles.wrapper}
      ref={wrapperRef}
      tabIndex={-1}
      onBlur={() => setShowCal(false)}
    >
      <Header
        curMid={curMid}
        setCurMid={setCurMid}
        onMoveClicked={onMoveClicked}
        onCopyClicked={onCopyClicked}
      />
      <Calendar
        view='editDate'
        calDates={calDates}
        setSelectedDid={setSelectedDid}
        selectedDid={selectedDid}
        mid={curMid}
      />
    </div>
  )
}

export default EditDateView
