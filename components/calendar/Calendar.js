import React from 'react'
import DateGrid from './DateGrid'
import Weekdays from './Weekdays'
import styles from './calendar.module.css'

const Calendar = ({
  weekdaysView,
  view,
  calDates,
  setSelectedDid,
  selectedDid,
  mid,
}) => {
  return (
    <div className={styles.wrapper}>
      <Weekdays weekdaysView={weekdaysView} />
      <DateGrid
        view={view}
        calDates={calDates}
        mid={mid}
        setSelectedDid={setSelectedDid}
        selectedDid={selectedDid}
      />
    </div>
  )
}

export default Calendar
