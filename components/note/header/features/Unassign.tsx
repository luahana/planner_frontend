import React, { useEffect } from 'react'
import { setIsLoading, selectNote } from '../../../../redux/slice/notesSlice'
import { getId } from '../../../../lib/note'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks'
import { useUpdateNoteMutation } from '../../../../redux/slice/api/notesApiSlice'
import styles from './unassign.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons'
import Note from '../../../../lib/note'

type Props = {
  note: Note
  removeNewNote: (newNote: Note) => number
}

const Unassign = ({ note, removeNewNote }: Props) => {
  const dispatch = useAppDispatch()
  const noteState = useAppSelector((state) => selectNote(state, getId(note)))
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
