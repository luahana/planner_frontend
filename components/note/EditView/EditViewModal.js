import React from 'react'
import { useDispatch } from 'react-redux'
import styles from '../../../styles/common.module.css'
import EditView from './EditView'
import { setModalClose } from '../../../redux/slice/notesSlice'
import { getId } from '../../../lib/note'

const EditViewModal = ({ note, removeNewNote }) => {
  const dispatch = useDispatch()
  const handleModal = () => {
    dispatch(setModalClose({ id: getId(note) }))
  }
  return (
    <>
      <div className={styles.modalBlanket} onClick={handleModal}></div>
      <EditView note={note} removeNewNote={removeNewNote} />
    </>
  )
}

export default EditViewModal
