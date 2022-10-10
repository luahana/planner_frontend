import { useEffect } from 'react'
import styles from './note.module.css'
import ShowView from './ShowView'
import Header from './header/Header'
import Loading from '../common/Loading'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNote,
  selectNote,
  setModalClose,
} from '../../redux/slice/notesSlice'
import { getId } from '../../lib/note'
import EditViewModal from './EditView/EditViewModal'
import EditDateViewModal from './EditDate/EditDateViewModal'
import Note from '../../lib/note'

type Props = {
  view?: string
  note: Note
  removeNewNote: (note: Note) => number
}

const Note = ({ view, note, removeNewNote }: Props) => {
  const dispatch = useDispatch()
  const noteState = useSelector((state) => selectNote(state, getId(note)))

  useEffect(() => {
    dispatch(
      addNote({
        id: getId(note),
        isLoading: false,
        isEditOpen: note.newNoteNum ? true : false,
        isCalOpen: false,
        selectedDids: [],
      })
    )
  }, [])

  const escFunction = (event) => {
    if (event.key === 'Escape') {
      dispatch(setModalClose({ id: note._id }))
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
