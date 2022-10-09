import React from 'react'
import styles from './calendar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { getId } from '../../../../lib/note'
import { useDispatch } from 'react-redux'
import { setModalOpen } from '../../../../redux/slice/notesSlice'

const Calendar = ({ note }) => {
  const dispatch = useDispatch()
  const handleModal = (isEditOpen, isCalOpen) => {
    dispatch(setModalOpen({ id: getId(note), isEditOpen, isCalOpen }))
  }

  return (
    <button className={styles.wrapper} onClick={() => handleModal(false, true)}>
      <FontAwesomeIcon icon={faCalendarDays} />
    </button>
  )
}

export default Calendar
