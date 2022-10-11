import React from 'react'
import { setIsLoading, selectNote } from '../../../../redux/slice/notesSlice'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import styles from './delete.module.css'
import { getId } from '../../../../lib/note'
import { useDeleteNoteMutation } from '../../../../redux/slice/api/notesApiSlice'
import { didFromDate } from '../../../../lib/date'
import Note from '../../../../lib/note'

type Props = {
  note: Note
  removeNewNote: (newNote: Note) => number
}

const Delete = ({ note, removeNewNote }: Props) => {
  const did = didFromDate(new Date(note.assignedTime))

  const dispatch = useAppDispatch()
  const noteState = useAppSelector((state) => selectNote(state, getId(note)))
  const [deleteNote, { isLoading }] = useDeleteNoteMutation()

  useEffect(() => {
    dispatch(setIsLoading({ id: getId(note), isLoading }))
  }, [isLoading])

  const handleDelete = async () => {
    if (noteState.isLoading) return
    if (!removeNewNote(note)) await deleteNote({ id: note.id, did })
  }
  return (
    <button className={styles.wrapper} onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  )
}

export default Delete
