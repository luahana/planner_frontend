import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useUpdateNoteMutation } from '../../redux/slice/api/notesApiSlice'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import Features from './Features'
import styles from './header.module.css'

const Header = ({
  view,
  note,
  removeNewNote,
  openEdit,
  openCal,
  oneLoading,
  setOneLoading,
}) => {
  const [completed, setCompleted] = useState(note.completed)

  const [updateNote, { isLoading }] = useUpdateNoteMutation()
  useEffect(() => {
    setOneLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    setCompleted(note.completed)
  }, [note.completed])

  const handleCompleted = async () => {
    if (oneLoading) return
    removeNewNote(note)
    await updateNote({
      ...note,
      completed: !completed,
    })
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
        note={note}
        removeNewNote={removeNewNote}
        openEdit={openEdit}
        openCal={openCal}
        setOneLoading={setOneLoading}
        oneLoading={oneLoading}
      />
    </div>
  )
}

export default Header
