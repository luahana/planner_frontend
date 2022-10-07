import React from 'react'
import { WEEKDAYS } from '../../lib/calendar'
import styles from './weekday.module.css'

const Weekdays = ({ weekdaysView }) => {
  return (
    <div className={styles.wrapper}>
      {WEEKDAYS.map((weekday) => (
        <div key={weekday} className={styles.weekday}>
          {weekdaysView === 'full' ? weekday : weekday.slice(0, 3)}
        </div>
      ))}
    </div>
  )
}

export default Weekdays
