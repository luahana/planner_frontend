import React from 'react'
import { setIsLoading, selectNote } from '../../../../redux/slice/notesSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import styles from './delete.module.css'
import { getId } from '../../../../lib/note'
import { useDeleteNoteMutation } from '../../../../redux/slice/api/notesApiSlice'
import { didFromDate } from '../../../../lib/date'

const Delete = ({ note, removeNewNote }) => {
  const did = didFromDate(new Date(note.assignedTime))

  const dispatch = useDispatch()
  const noteState = useSelector((state) => selectNote(state, getId(note)))
  const [deleteNote, { isLoading }] = useDeleteNoteMutation()

  useEffect(() => {
    dispatch(setIsLoading({ id: getId(note), isLoading }))
  }, [isLoading])

  const handleDelete = async () => {
    if (noteState.isLoading) return
    if (!removeNewNote(note)) await deleteNote({ id: note._id, did })
  }
  return (
    <div className={styles.wrapper} onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrash} />
    </div>
  )
}

export default Delete
