import React from 'react'
import EditDateDay from '../note/EditDate/Day'
import MonthlyDay from '../pages/monthly/Day'
import styles from './date_grid.module.css'

const DateGrid = ({
  view,
  calDates,
  selectedDids,
  setSelectedDids,
  mid,
  curDate,
}) => {
  return (
    <div className={styles.wrapper}>
      {calDates.map((day) => {
        if (view === 'editDate')
          return (
            <EditDateDay
              key={day}
              day={day}
              selectedDids={selectedDids}
              setSelectedDids={setSelectedDids}
              mid={mid}
              curDate={curDate}
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
