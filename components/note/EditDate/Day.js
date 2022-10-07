import React from 'react'
import { didFromDateStr, ymdFromMid } from '../../../lib/date'
import styles from './day.module.css'

const Day = ({ day, selectedDid, setSelectedDid, mid }) => {
  const { month } = ymdFromMid(mid)
  const dt = new Date(day)
  return (
    <div
      className={`${styles.wrapper} ${
        dt.toDateString() === new Date().toDateString() && styles.today
      } ${dt.getMonth() + 1 !== month && styles.otherMonthDay} ${
        didFromDateStr(day) === selectedDid && styles.selectedDate
      }`}
      key={day}
      onClick={() => setSelectedDid(didFromDateStr(day))}
    >
      <div>{new Date(day).getDate()}</div>
    </div>
  )
}

export default Day
