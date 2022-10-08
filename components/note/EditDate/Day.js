import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { didFromDate, didFromDateStr, ymdFromMid } from '../../../lib/date'
import styles from './day.module.css'
import { setSelectedDids, selectNote } from '../../../redux/slice/notesSlice'
import { getId } from '../../../lib/note'

const Day = ({ note, day, mid }) => {
  const curDate = new Date(note.assignedTime)
  const { month } = ymdFromMid(mid)
  const dt = new Date(day)
  const noteState = useSelector((state) => selectNote(state, getId(note)))

  const dispatch = useDispatch()

  const handleSelect = (day) => {
    if (noteState.selectedDids.includes(didFromDateStr(day))) {
      dispatch(
        setSelectedDids({
          id: getId(note),
          selectedDids: noteState.selectedDids.filter(
            (did) => did !== didFromDateStr(day)
          ),
        })
      )
    } else {
      dispatch(
        setSelectedDids({
          id: getId(note),
          selectedDids: [...noteState.selectedDids, didFromDateStr(day)],
        })
      )
    }
  }
  return (
    <div
      className={`${styles.wrapper} 
        ${dt.toDateString() === new Date().toDateString() && styles.today} 
        ${dt.getMonth() + 1 !== month && styles.otherMonthDay} 
        ${didFromDate(curDate) === didFromDateStr(day) && styles.curDate} 
        ${
          noteState.selectedDids.includes(didFromDateStr(day)) &&
          styles.selectedDate
        }`}
      key={day}
      onClick={() => handleSelect(day)}
    >
      <div>{new Date(day).getDate()}</div>
    </div>
  )
}

export default Day
