import React from 'react'
import EditDateDay from '../note/EditDate/Day'
import MonthlyDay from '../pages/monthly/Day'
import styles from './date_grid.module.css'
import Note from '../../lib/note'

type Props = {
  view: string
  note: Note
  calDates: string[]
  mid: string
}

const DateGrid = ({ view, note, calDates, mid }: Props) => {
  return (
    <div className={styles.wrapper}>
      {calDates.map((day) => {
        if (view === 'editDate')
          return <EditDateDay key={day} note={note} day={day} mid={mid} />
        if (view === 'month' || view == 'monthSmall') {
          return <MonthlyDay key={day} view={view} day={day} mid={mid} />
        }
      })}
    </div>
  )
}

export default DateGrid
