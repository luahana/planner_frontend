import React from 'react'
import { useDispatch } from 'react-redux'
import styles from '../../../styles/common.module.css'
import EditDateView from './EditDateView'
import { setModalClose } from '../../../redux/slice/notesSlice'
import { getId } from '../../../lib/note'
import Note from '../../../lib/note'

type Props = {
  view?: string
  note: Note
  removeNewNote: (newNote: Note) => string
}

const EditDateViewModal = ({ view, note, removeNewNote }: Props) => {
  const dispatch = useDispatch()
  const handleModal = () => {
    dispatch(setModalClose({ id: getId(note) }))
  }
  return (
    <>
      <div className={styles.modalBlanket} onClick={() => handleModal()}></div>
      <EditDateView view={view} note={note} removeNewNote={removeNewNote} />
    </>
  )
}

export default EditDateViewModal
