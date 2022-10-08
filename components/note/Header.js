import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useUpdateNoteMutation } from '../../redux/slice/api/notesApiSlice'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import Features from './Features'
import styles from './header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoading } from '../../redux/slice/notesSlice'

const Header = ({ view, note, removeNewNote }) => {
  const [completed, setCompleted] = useState(note.completed)
  const dispatch = useDispatch()
  const noteState = useSelector(
    (state) => state.notes[note._id ?? note.newNoteNum]
  )
  const [updateNote, { isLoading }] = useUpdateNoteMutation()
  useEffect(() => {
    dispatch(setIsLoading({ id: note._id ?? note.newNoteNum, isLoading }))
  }, [isLoading])

  useEffect(() => {
    setCompleted(note.completed)
  }, [note.completed])

  const handleCompleted = async () => {
    if (noteState.isLoading) return
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
      <Features view={view} note={note} removeNewNote={removeNewNote} />
    </div>
  )
}

export default Header
