import { useEffect } from 'react'
import styles from './note.module.css'
import ShowView from './ShowView'
import Header from './header/Header'
import Loading from '../common/Loading'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import {
  addNote,
  selectNote,
  setModalClose,
} from '../../redux/slice/notesSlice'
import { getId } from '../../lib/note'
import EditViewModal from './EditView/EditViewModal'
import EditDateViewModal from './EditDate/EditDateViewModal'
import Note from '../../lib/note'
import { AppDispatch } from '../../redux/store'

type Props = {
  view?: string
  note: Note
  removeNewNote: (note: Note) => string
}

const Note = ({ view, note, removeNewNote }: Props) => {
  const dispatch: AppDispatch = useAppDispatch()
  const noteState = useAppSelector((state) => selectNote(state, getId(note)))

  useEffect(() => {
    dispatch(
      addNote({
        id: getId(note),
        isLoading: false,
        isEditOpen: note.newNoteId ? true : false,
        isCalOpen: false,
        selectedDids: [],
      })
    )
  }, [])

  const escFunction = (event) => {
    if (event.key === 'Escape') {
      dispatch(setModalClose({ id: note.id }))
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [])

  return (
    <div className={`${styles.wrapper} ${note.completed && styles.completed}`}>
      {noteState.isLoading && <Loading size={60} />}

      <Header view={view} note={note} removeNewNote={removeNewNote} />
      <div className={styles.note}>
        <ShowView note={note} />
        {noteState.isEditOpen && (
          <EditViewModal note={note} removeNewNote={removeNewNote} />
        )}
        {noteState.isCalOpen && (
          <EditDateViewModal
            view={view}
            note={note}
            removeNewNote={removeNewNote}
          />
        )}
      </div>
    </div>
  )
}
export default Note
