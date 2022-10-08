import React from 'react'
import DateGrid from './DateGrid'
import Weekdays from './Weekdays'
import styles from './calendar.module.css'

const Calendar = ({
  weekdaysView,
  view,
  calDates,
  setSelectedDids,
  selectedDids,
  mid,
  curDate,
}) => {
  return (
    <div className={styles.wrapper}>
      <Weekdays weekdaysView={weekdaysView} />
      <DateGrid
        view={view}
        calDates={calDates}
        mid={mid}
        setSelectedDids={setSelectedDids}
        selectedDids={selectedDids}
        curDate={curDate}
      />
    </div>
  )
}

export default Calendar
