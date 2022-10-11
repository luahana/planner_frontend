import React from 'react'
import styles from './buttons.module.css'
import { selectNote } from '../../../../../redux/slice/notesSlice'
import { getId } from '../../../../../lib/note'
import Move from './Move'
import Copy from './Copy'
import Deselect from './Deselect'
import Note from '../../../../../lib/note'
import { useAppSelector } from '../../../../../redux/hooks'

type Props = {
  note: Note
  removeNewNote: (newNote: Note) => number
}

const Buttons = ({ note, removeNewNote }: Props) => {
  const noteState = useAppSelector((state) => selectNote(state, getId(note)))
  const selectedDids: string[] = noteState.selectedDids

  return (
    <div className={styles.wrapper}>
      <Copy note={note} />
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
