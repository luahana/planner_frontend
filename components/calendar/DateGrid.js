import React from 'react'
import EditDateDay from '../note/EditDate/Day'
import MonthlyDay from '../pages/monthly/Day'
import styles from './date_grid.module.css'

const DateGrid = ({ view, calDates, setSelectedDid, selectedDid, mid }) => {
  return (
    <div className={styles.wrapper}>
      {calDates.map((day) => {
        if (view === 'editDate')
          return (
            <EditDateDay
              key={day}
              day={day}
              selectedDid={selectedDid}
              setSelectedDid={setSelectedDid}
              mid={mid}
            />
          )
        if (view === 'month' || view == 'monthSmall') {
          return <MonthlyDay view={view} key={day} day={day} mid={mid} />
        }
      })}
    </div>
  )
}

export default DateGrid
