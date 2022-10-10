import React from 'react'
import DateGrid from './DateGrid'
import Weekdays from './Weekdays'
import styles from './calendar.module.css'
import Note from '../../lib/note'

type Props = {
  weekdaysView?: string
  view: string
  note: Note
  calDates: string[]
  mid: string
}

const Calendar = ({ weekdaysView, view, note, calDates, mid }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Weekdays weekdaysView={weekdaysView} />
      <DateGrid view={view} note={note} calDates={calDates} mid={mid} />
    </div>
  )
}

export default Calendar
