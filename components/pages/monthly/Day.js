import React from 'react'
import styles from './day.module.css'
import Notes from './Notes'
import { didFromDateStr, ymdFromMid } from '../../../lib/date'
import useUserAuth from '../../../hooks/useUserAuth'
import Link from 'next/link'

const Day = ({ view, day, mid }) => {
  const userId = useUserAuth()
  const { month } = ymdFromMid(mid)
  const dt = new Date(day)
  const dayMonth = dt.getMonth() + 1

  return (
    <Link key={day} href={`/daily/${didFromDateStr(day)}`}>
      <div
        className={`${styles.wrapper} ${
          dayMonth !== month && styles.otherMonthDay
        } ${day === new Date().toDateString() && styles.today} ${
          view === 'monthSmall' && styles.small
        }`}
        key={day}
      >
        <div className={styles.date}>{dt.getDate()}</div>
        {view === 'month' && (
          <Notes view='month' userId={userId} curDate={dt} />
        )}
        {view === 'monthSmall' && (
          <Notes view='monthSmall' userId={userId} curDate={dt} />
        )}
      </div>
    </Link>
  )
}

export default Day
