import React from 'react'
import styled from 'styled-components'

const CompletedNoteDiv = styled.div`
  background-color: hsl(61, 25%, 81%);
  padding-left: 0.5rem;
  border-top: 1px outset white;
  border-bottom: 1px outset white;
  color: black;
`

const IncompletedNoteDiv = styled.div`
  background-color: hsl(61, 100%, 81%);
  padding-left: 0.5rem;
  border-top: 1px outset white;
  border-bottom: 1px outset white;
  color: black;
`

const SmallView = ({ notes }) => {
  const numCompleted = notes.reduce(
    (acc, cur) => (cur.completed ? acc + 1 : acc),
    0
  )
  const numInCompleted = notes.length - numCompleted
  return (
    <>
      {numCompleted > 0 && <CompletedNoteDiv>{numCompleted}</CompletedNoteDiv>}
      {numInCompleted > 0 && (
        <IncompletedNoteDiv>{numInCompleted}</IncompletedNoteDiv>
      )}
    </>
  )
}

export default SmallView
