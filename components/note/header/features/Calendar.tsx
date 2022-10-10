import React from 'react'
import styles from './calendar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { getId } from '../../../../lib/note'
import { useDispatch } from 'react-redux'
import { setModalOpen } from '../../../../redux/slice/notesSlice'
import Note from '../../../../lib/note'

type Props = {
  note: Note
}

const Calendar = ({ note }: Props) => {
  const dispatch = useDispatch()
  const handleModal = (isEditOpen: boolean, isCalOpen: boolean) => {
    dispatch(setModalOpen({ id: getId(note), isEditOpen, isCalOpen }))
  }

  return (
    <button className={styles.wrapper} onClick={() => handleModal(false, true)}>
      <FontAwesomeIcon icon={faCalendarDays} />
    </button>
  )
}

export default Calendar
