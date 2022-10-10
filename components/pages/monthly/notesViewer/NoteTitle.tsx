import React from 'react'
import Note from '../../../../lib/note'

type Props = {
  note: Note
}

const NoteTitle = ({ note }: Props) => {
  return (
    <>{note.title.length > 10 ? `${note.title.slice(0, 10)}...` : note.title}</>
  )
}

export default NoteTitle
