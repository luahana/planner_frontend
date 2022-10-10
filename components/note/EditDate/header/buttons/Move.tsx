import React, { useEffect } from 'react'
import styles from './move.module.css'
import { dateFromDid } from '../../../../../lib/date'
import { useUpdateNoteMutation } from '../../../../../redux/slice/api/notesApiSlice'
import {
  setIsLoading,
  setModalClose,
  selectNote,
} from '../../../../../redux/slice/notesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getId } from '../../../../../lib/note'
import Note from '../../../../../lib/note'

type Props = {
  note: Note
  removeNewNote: (newNote: Note) => number
}

const Move = ({ note, removeNewNote }: Props) => {
  const dispatch = useDispatch()
  const noteState = useSelector((state) => selectNote(state, getId(note)))
  const selectedDids: string[] = noteState.selectedDids
  const [updateNote, { isLoading }] = useUpdateNoteMutation()

  useEffect(() => {
    dispatch(setIsLoading({ id: getId(note), isLoading }))
  }, [isLoading])

  const handleMove = async () => {
    if (noteState.isLoading) return

    const didsToMove = selectedDids.filter((did) => did !== '19691231')
    if (didsToMove.length !== 1 || didsToMove[0] === '19691231') return

    const tobeDate = dateFromDid(didsToMove[0])
    if (note.assignedTime !== tobeDate.getTime()) {
      removeNewNote(note)
      await updateNote({
        ...note,
        assigned: true,
        curDate: note.assignedTime,
        assignedTime: tobeDate.getTime(),
      })
    }
    dispatch(setModalClose({ id: getId(note) }))
  }
  return (
    <div className={styles.wrapper} onClick={handleMove}>
      Move
    </div>
  )
}

export default Move
