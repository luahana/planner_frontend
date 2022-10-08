import React from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedDids } from '../../../../../redux/slice/notesSlice'
import styles from './deselect.module.css'
import { getId } from '../../../../../lib/note'

const Deselect = ({ note }) => {
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
