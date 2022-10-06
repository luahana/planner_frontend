import React from 'react'

const NoteTitle = ({ note }) => {
  return (
    <>{note.title.length > 10 ? `${note.title.slice(0, 10)}...` : note.title}</>
  )
}

export default NoteTitle
