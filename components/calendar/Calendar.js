import React from 'react'
import DateGrid from './DateGrid'
import Weekdays from './Weekdays'
import styles from './calendar.module.css'

const Calendar = ({ weekdaysView, view, note, calDates, mid }) => {
  return (
    <div className={styles.wrapper}>
      <Weekdays weekdaysView={weekdaysView} />
      <DateGrid view={view} note={note} calDates={calDates} mid={mid} />
    </div>
  )
}

export default Calendar
