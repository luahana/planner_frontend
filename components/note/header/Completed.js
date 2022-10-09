import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { setIsLoading, selectNote } from '../../../redux/slice/notesSlice'
import { useUpdateNoteMutation } from '../../../redux/slice/api/notesApiSlice'
import { getId } from '../../../lib/note'
import styles from './completed.module.css'

const Completed = ({ note, removeNewNote }) => {
  const dispatch = useDispatch()
  const noteState = useSelector((state) => selectNote(state, getId(note)))
  const [completed, setCompleted] = useState(note.completed)
  const [updateNote, { isLoading }] = useUpdateNoteMutation()

  useEffect(() => {
    dispatch(setIsLoading({ id: getId(note), isLoading }))
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
    <button className={styles.wrapper} onClick={handleCompleted}>
      {note?.completed ? (
        <FontAwesomeIcon icon={faCheck} />
      ) : (
        <FontAwesomeIcon icon={faCircle} />
      )}
    </button>
  )
}

export default Completed
