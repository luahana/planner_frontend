import React, { useEffect } from 'react'
import styles from './copy.module.css'
import { dateFromDid } from '../../../../../lib/date'
import { useUpdateNoteMutation } from '../../../../../redux/slice/api/notesApiSlice'
import {
  setIsLoading,
  setModalClose,
  selectNote,
} from '../../../../../redux/slice/notesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getId } from '../../../../../lib/note'

const Copy = ({ note }) => {
  const dispatch = useDispatch()
  const noteState = useSelector((state) => selectNote(state, getId(note)))
  const selectedDids = noteState.selectedDids
  const [updateNote, { isLoading }] = useUpdateNoteMutation()

  useEffect(() => {
    dispatch(setIsLoading({ id: getId(note), isLoading }))
  }, [isLoading])

  const handleCopy = async () => {
    if (noteState.isLoading) return

    const didsToCopy = selectedDids.filter((did) => did !== '19691231')
    if (didsToCopy.length === 0) return

    const tobeDates = didsToCopy.map((did) => dateFromDid(did))
    for (let i = 0; i < tobeDates.length; i++) {
      if (note.assignedTime !== tobeDates[i].getTime()) {
        await updateNote({
          ...note,
          assigned: true,
          curDate: note.assignedTime,
          assignedTime: tobeDates[i].getTime(),
          _id: undefined,
        })
      }
    }
    dispatch(setModalClose({ id: getId(note) }))
  }
  return (
    <div className={styles.wrapper} onClick={handleCopy}>
      Copy
    </div>
  )
}

export default Copy
