import React from 'react'
import styles from './day.module.css'
import Notes from './Notes'
import { didFromDateStr, ymdFromMid } from '../../../lib/date'
import Link from 'next/link'

type Props = {
  view: string
  day: string
  mid: string
}

const Day = ({ view, day, mid }: Props) => {
  const { month } = ymdFromMid(mid)
  const dt: Date = new Date(day)
  const todayStr: string = new Date().toDateString()
  const dayMonth: number = dt.getMonth() + 1

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
