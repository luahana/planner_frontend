import React from 'react'
import styles from './note.module.css'
import EditView from './EditView'
import ShowView from './ShowView'
import Header from './Header'
import EditDateView from './EditDate/EditDateView'
import Loading from '../common/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addNote, selectNote, setModalOpen } from '../../redux/slice/notesSlice'
import { getId } from '../../lib/note'

const Note = ({ view, note, removeNewNote }) => {
  const dispatch = useDispatch()
  const noteState = useSelector((state) => selectNote(state, getId(note)))

  useEffect(() => {
    dispatch(
      addNote({
        id: getId(note),
        isLoading: false,
        isEditOpen: false,
        isCalOpen: false,
        selectedDids: [],
      })
    )
  }, [])

  const handleModal = (isEditOpen, isCalOpen) => {
    dispatch(setModalOpen({ id: getId(note), isEditOpen, isCalOpen }))
  }

  return (
    <div className={`${styles.wrapper} ${note.completed && styles.completed}`}>
      {noteState.isLoading && <Loading size={60} />}

      <Header view={view} note={note} removeNewNote={removeNewNote} />
      <div className={styles.note}>
        <ShowView note={note} />
        {noteState.isEditOpen && (
          <>
            <div
              className={styles.modalBlanket}
              onClick={() => handleModal(false, false)}
            ></div>
            <EditView note={note} removeNewNote={removeNewNote} />
          </>
        )}
        {noteState.isCalOpen && (
          <>
            <div
              className={styles.modalBlanket}
              onClick={() => handleModal(false, false)}
            ></div>
            <EditDateView
              view={view}
              note={note}
              removeNewNote={removeNewNote}
            />
          </>
        )}
      </div>
    </div>
  )
}
export default Note
