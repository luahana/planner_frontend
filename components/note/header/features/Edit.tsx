import React from 'react'
import styles from './edit.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { getId } from '../../../../lib/note'
import { useDispatch } from 'react-redux'
import { setModalOpen } from '../../../../redux/slice/notesSlice'
import Note from '../../../../lib/note'

type Props = {
  note: Note,
}

const Edit = ({ note }: Props) => {
  const dispatch = useDispatch()
  const handleModal = (isEditOpen, isCalOpen) => {
    dispatch(setModalOpen({ id: getId(note), isEditOpen, isCalOpen }))
  }

  return (
    <button className={styles.wrapper} onClick={() => handleModal(true, false)}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  )
}

export default Edit
