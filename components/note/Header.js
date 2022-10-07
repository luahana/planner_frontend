import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useDeleteNoteMutation } from '../../redux/slice/api/notesApiSlice'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import Features from './Features'
import { updateNewNotes } from '../../lib/note'
import styles from './header.module.css'

const Header = ({
  view,
  note,
  did,
  handleCompleted,
  handleEdit,
  handleEditDate,
  handleUnassign,
  setNewNotes,
}) => {
  const [
    deleteNote,
    {
      isLoading: isDelLoading,
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delerror,
    },
  ] = useDeleteNoteMutation()

  const handleDelete = async () => {
    if (!updateNewNotes(note.newNoteNum, setNewNotes))
      await deleteNote({ id: note._id, did })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.completed}>
        <div className={styles.completedPointer} onClick={handleCompleted}>
          {note?.completed ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faCircle} />
          )}
        </div>
      </div>
      <Features
        view={view}
        handleEdit={handleEdit}
        handleEditDate={handleEditDate}
        handleUnassign={handleUnassign}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default Header
