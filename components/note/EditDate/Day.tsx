import React from 'react'
import { didFromDate, didFromDateStr, ymdFromMid } from '../../../lib/date'
import styles from './day.module.css'
import { setSelectedDids, selectNote } from '../../../redux/slice/notesSlice'
import { getId } from '../../../lib/note'
import Note from '../../../lib/note'
import { ymd } from '../../../lib/date'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'

type Props = {
  note: Note
  day: string
  mid: string
}

const Day = ({ note, day, mid }: Props) => {
  const curDate = new Date(note.assignedTime)
  const dt: Date = new Date(day)
  const did: string = didFromDateStr(day)
  const { month }: ymd = ymdFromMid(mid)
  const dispatch = useAppDispatch()
  const noteState = useAppSelector((state) => selectNote(state, getId(note)))
  const selectedDids = noteState.selectedDids

  const handleSelect = () => {
    let selDids = [...selectedDids, did]
    if (selectedDids.includes(did)) {
      selDids = selectedDids.filter((sDid) => sDid !== did)
    }
    dispatch(
      setSelectedDids({
        id: getId(note),
        selectedDids: selDids,
      })
    )
  }
  return (
    <div
      className={`${styles.wrapper} 
        ${day === new Date().toDateString() && styles.today} 
        ${dt.getMonth() + 1 !== month && styles.otherMonthDay} 
        ${did === didFromDate(curDate) && styles.curDate} 
        ${selectedDids.includes(did) && styles.selectedDate}`}
      onClick={() => handleSelect()}
    >
      <div>{new Date(day).getDate()}</div>
    </div>
  )
}

export default Day
