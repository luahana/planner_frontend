import React, { useEffect } from 'react'
import { setIsLoading, selectNote } from '../../../../redux/slice/notesSlice'
import { getId } from '../../../../lib/note'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateNoteMutation } from '../../../../redux/slice/api/notesApiSlice'
import styles from './unassign.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons'

const Unassign = ({ note, removeNewNote }) => {
  const dispatch = useDispatch()
  const noteState = useSelector((state) => selectNote(state, getId(note)))
  const [updateNote, { isLoading }] = useUpdateNoteMutation()

  useEffect(() => {
    dispatch(setIsLoading({ id: getId(note), isLoading }))
  }, [isLoading])

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
  return (
    <button className={styles.wrapper} onClick={handleUnassign}>
      <FontAwesomeIcon icon={faArrowTurnUp} />
    </button>
  )
}

export default Unassign
