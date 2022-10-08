import React from 'react'
import { useState } from 'react'
import { getCalDates } from '../../../lib/calendar'
import { didFromDate, midFromDate, dateFromDid } from '../../../lib/date'
import { useEffect } from 'react'
import Header from './Header'
import Calendar from '../../calendar/Calendar'
import styles from './edit_date_view.module.css'
import { useUpdateNoteMutation } from '../../../redux/slice/api/notesApiSlice'

const EditDateView = ({
  note,
  view,
  oneLoading,
  setOneLoading,
  removeNewNote,
  openCal,
}) => {
  const curDate = new Date(note.assignedTime)
  const curDid = didFromDate(curDate)

  const [selectedDids, setSelectedDids] = useState([])
  const [curMid, setCurMid] = useState(midFromDate(curDate))
  const [calDates, setCalDates] = useState(getCalDates(curMid))
  const [updateNote, { isLoading }] = useUpdateNoteMutation()

  useEffect(() => {
    if (view === 'unassigned') {
      setCurMid(midFromDate(new Date()))
    }
  }, [])

  useEffect(() => {
    setOneLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    setCalDates(getCalDates(curMid))
  }, [curMid])

  const handleMove = async () => {
    if (oneLoading) return

    const didsToMove = selectedDids.filter((did) => did !== '19691231')
    if (didsToMove.length !== 1 || didsToMove[0] === '19691231') return

    const tobeDate = dateFromDid(didsToMove[0])
    if (note.assignedTime !== tobeDate.getTime()) {
      removeNewNote(note)
      await updateNote({
        ...note,
        assigned: true,
        curDate: note.assignedTime,
        assignedTime: tobeDate.getTime(),
      })
    }
    openCal(false)
  }
  const handleCopy = async () => {
    if (oneLoading) return

    const didsToCopy = selectedDids.filter((did) => did !== '19691231')
    if (didsToCopy.length === 0) return

    const tobeDates = didsToCopy.map((did) => dateFromDid(did))
    for (let i = 0; i < tobeDates.length; i++) {
      if (note.assignedTime !== tobeDates[i].getTime()) {
        await updateNote({
          ...note,
          assigned: true,
          curDate: note.assignedTime,
          assignedTime: tobeDates[i].getTime(),
          _id: undefined,
        })
      }
    }
    setIsOpenCal(false)
  }

  return (
    <div className={styles.wrapper}>
      <Header
        curDid={curDid}
        curMid={curMid}
        setCurMid={setCurMid}
        handleMove={handleMove}
        handleCopy={handleCopy}
        selectedDids={selectedDids}
        setSelectedDids={setSelectedDids}
      />
      <Calendar
        view='editDate'
        calDates={calDates}
        setSelectedDids={setSelectedDids}
        selectedDids={selectedDids}
        mid={curMid}
        curDate={curDate}
      />
    </div>
  )
}

export default EditDateView
