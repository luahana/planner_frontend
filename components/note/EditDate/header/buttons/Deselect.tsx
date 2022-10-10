import React from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedDids } from '../../../../../redux/slice/notesSlice'
import styles from './deselect.module.css'
import { getId } from '../../../../../lib/note'
import Note from '../../../../../lib/note'

type Props = {
  note: Note
}

const Deselect = ({ note }: Props) => {
  const dispatch = useDispatch()
  return (
    <div
      className={styles.wrapper}
      onClick={() =>
        dispatch(setSelectedDids({ id: getId(note), selectedDids: [] }))
      }
    >
      deselect
    </div>
  )
}

export default Deselect
