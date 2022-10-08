import React from 'react'
import styles from './buttons.module.css'
import { selectNote } from '../../../../../redux/slice/notesSlice'
import { useSelector } from 'react-redux'
import { getId } from '../../../../../lib/note'
import Move from './Move'
import Copy from './Copy'
import Deselect from './Deselect'

const Buttons = ({ note, removeNewNote }) => {
  const noteState = useSelector((state) => selectNote(state, getId(note)))
  const selectedDids = noteState.selectedDids

  return (
    <div className={styles.buttons}>
      <Copy note={note} removeNewNote={removeNewNote} />
      {selectedDids.filter((did) => did !== '19691231').length <= 1 && (
        <Move note={note} removeNewNote={removeNewNote} />
      )}
      {selectedDids.filter((did) => did !== '19691231').length > 1 && (
        <Deselect note={note} />
      )}
    </div>
  )
}

export default Buttons
