import React from 'react'
import { useState } from 'react'
import { getCalDates } from '../../../lib/calendar'
import { didFromDate, midFromDate, dateFromDid } from '../../../lib/date'
import { useEffect } from 'react'
import Header from './Header'
import Calendar from '../../calendar/Calendar'
import styles from './edit_date_view.module.css'

const EditDateView = ({ view, curDate, handleMove, handleCopy }) => {
  const curDid = didFromDate(curDate)

  const [selectedDids, setSelectedDids] = useState([curDid])
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

  const onMoveClicked = () => {
    const didsToMove = selectedDids.filter((did) => did !== '19691231')
    if (didsToMove.length !== 1 || didsToMove[0] === '19691231') return

    handleMove(dateFromDid(didsToMove[0]))
  }
  const onCopyClicked = () => {
    const didsToCopy = selectedDids.filter((did) => did !== '19691231')
    if (didsToCopy.length === 0) return

    handleCopy(didsToCopy)
  }
  return (
    <div className={styles.wrapper}>
      <Header
        curMid={curMid}
        setCurMid={setCurMid}
        onMoveClicked={onMoveClicked}
        onCopyClicked={onCopyClicked}
        selectedDids={selectedDids}
        setSelectedDids={setSelectedDids}
      />
      <Calendar
        view='editDate'
        calDates={calDates}
        setSelectedDids={setSelectedDids}
        selectedDids={selectedDids}
        mid={curMid}
      />
    </div>
  )
}

export default EditDateView
