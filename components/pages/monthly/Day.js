import React from 'react'
import styles from './day.module.css'
import Notes from './Notes'
import { didFromDateStr, ymdFromMid } from '../../../lib/date'

import Link from 'next/link'

const Day = ({ view, day, mid }) => {
  const { month } = ymdFromMid(mid)
  const dt = new Date(day)
  const todayStr = new Date().toDateString()
  const dayMonth = dt.getMonth() + 1

  return (
    <Link key={day} href={`/daily/${didFromDateStr(day)}`}>
      <button
        className={`${styles.wrapper} 
          ${dayMonth !== month && styles.otherMonthDay} 
          ${day === todayStr && styles.today} 
          ${view === 'monthSmall' && styles.small}`}
        key={day}
      >
        <div className={styles.date}>{dt.getDate()}</div>
        {view === 'month' && <Notes view='month' curDate={dt} />}
        {view === 'monthSmall' && <Notes view='monthSmall' curDate={dt} />}
      </button>
    </Link>
  )
}

export default Day
