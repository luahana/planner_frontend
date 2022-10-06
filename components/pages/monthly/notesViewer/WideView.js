import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import NoteTitle from './NoteTitle'

const CompletedNoteDiv = styled.div`
  background-color: hsl(61, 25%, 81%);
  padding-left: 0.5rem;
  border-top: 1px outset white;
  border-bottom: 1px outset white;
  color: black;
`
const IncompletedNoteDiv = styled.div`
  background-color: hsl(61, 100%, 81%);
`

const MoreDiv = styled.div`
  text-align: right;
  padding-right: 0.5rem;
  color: black;
`

const WideView = ({ notes }) => {
  const maxNotes = 3
  const numNotes = notes.length
  const [displayNotes, setDisplayNotes] = useState(notes)

  useEffect(() => {
    if (numNotes > maxNotes) setDisplayNotes(notes.slice(0, maxNotes))
  }, [])

  return (
    <>
      {displayNotes.map((note) => {
        if (note.completed)
          return (
            <CompletedNoteDiv>
              <NoteTitle note={note} />
            </CompletedNoteDiv>
          )
        return (
          <IncompletedNoteDiv>
            <NoteTitle note={note} />
          </IncompletedNoteDiv>
        )
      })}
      {numNotes > maxNotes && <MoreDiv>more...</MoreDiv>}
    </>
  )
}

export default WideView
