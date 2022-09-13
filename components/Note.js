import React from 'react'
import styled from 'styled-components'
import { useGetNotesQuery } from '../redux/slice/api/notesApiSlice'

const NoteDiv = styled.div`
  border: 1px solid black;
  width: 200px;
  height: 250px;
`

const TitleDiv = styled.div`
  border-bottom: 1px solid black;
`

const Note = ({ noteId }) => {
  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  })

  return (
    <NoteDiv>
      <TitleDiv>{note.title}</TitleDiv>
      <div>{note.content}</div>
      <div>{note.completed.toString()}</div>
    </NoteDiv>
  )
}

export default Note
