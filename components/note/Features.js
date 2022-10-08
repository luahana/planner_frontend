import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faPenToSquare,
  faCalendarDays,
  faArrowTurnUp,
} from '@fortawesome/free-solid-svg-icons'
import styles from './features.module.css'
import {
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from '../../redux/slice/api/notesApiSlice'
import { didFromDate } from '../../lib/date'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoading, setModalOpen } from '../../redux/slice/notesSlice'
import { getId } from '../../lib/note'

const Features = ({ view, note, removeNewNote }) => {
  const did = didFromDate(new Date(note.assignedTime))
  const [updateNote, { isLoading }] = useUpdateNoteMutation()
  const [deleteNote, { isLoading: isDelLoading }] = useDeleteNoteMutation()
  const dispatch = useDispatch()
  const noteState = useSelector(
    (state) => state.notes[note._id ?? note.newNoteNum]
  )
  useEffect(() => {
    dispatch(setIsLoading({ id: getId(note), isLoading }))
  }, [isLoading, isDelLoading])

  const handleDelete = async () => {
    if (!removeNewNote(note)) await deleteNote({ id: note._id, did })
  }

  const handleUnassign = async () => {
    if (noteState.isLoading) return
    removeNewNote(note)
    await updateNote({
      ...note,
      assigned: false,
      assignedTime: 0,
      curDate: note.assignedTime,
    })
  }

  const handleModal = (isEditOpen, isCalOpen) => {
    dispatch(setModalOpen({ id: getId(note), isEditOpen, isCalOpen }))
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.feature} onClick={() => handleModal(true, false)}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </div>
      <div className={styles.feature} onClick={() => handleModal(false, true)}>
        <FontAwesomeIcon icon={faCalendarDays} />
      </div>
      {view !== 'unassigned' && (
        <div className={styles.feature} onClick={handleUnassign}>
          <FontAwesomeIcon icon={faArrowTurnUp} />
        </div>
      )}

      <div className={styles.feature} onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  )
}

export default Features
