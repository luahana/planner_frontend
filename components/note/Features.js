import { useEffect, useState } from 'react'
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

const Features = ({
  view,
  note,
  removeNewNote,
  openEdit,
  openCal,
  setOneLoading,
  oneLoading,
}) => {
  const did = didFromDate(new Date(note.assignedTime))
  const [updateNote, { isLoading }] = useUpdateNoteMutation()
  const [deleteNote, { isLoading: isDelLoading }] = useDeleteNoteMutation()
  useEffect(() => {
    setOneLoading(isLoading)
  }, [isLoading, isDelLoading])

  const handleDelete = async () => {
    if (!removeNewNote(note)) await deleteNote({ id: note._id, did })
  }

  const handleUnassign = async () => {
    if (oneLoading) return
    removeNewNote(note)
    await updateNote({
      ...note,
      assigned: false,
      assignedTime: 0,
      curDate: note.assignedTime,
    })
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.feature} onClick={() => openEdit(true)}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </div>
      <div className={styles.feature} onClick={() => openCal(true)}>
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
