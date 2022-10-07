import React from 'react'
import { didFromDateStr, ymdFromMid } from '../../../lib/date'
import styles from './day.module.css'

const Day = ({ day, selectedDids, setSelectedDids, mid }) => {
  const { month } = ymdFromMid(mid)
  const dt = new Date(day)

  const handleSelect = (day) => {
    if (selectedDids.includes(didFromDateStr(day))) {
      setSelectedDids((dids) =>
        dids.filter((did) => did !== didFromDateStr(day))
      )
    } else {
      setSelectedDids((prev) => [...prev, didFromDateStr(day)])
    }
  }
  return (
    <div
      className={`${styles.wrapper} ${
        dt.toDateString() === new Date().toDateString() && styles.today
      } ${dt.getMonth() + 1 !== month && styles.otherMonthDay} ${
        selectedDids.includes(didFromDateStr(day)) && styles.selectedDate
      }`}
      key={day}
      onClick={() => handleSelect(day)}
    >
      <div>{new Date(day).getDate()}</div>
    </div>
  )
}

export default Day
