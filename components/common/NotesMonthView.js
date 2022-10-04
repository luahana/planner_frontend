import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import styled from 'styled-components'

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NotesMonthView = ({ view, content: notes, loading }) => {
  if (loading) {
    return (
      <LoaderWrapper>
        <ClipLoader color='aqua' size={50} aria-label='Loading Spinner' />
      </LoaderWrapper>
    )
  }

  if (view === 'monthSmall') {
    const numCompleted = notes.reduce(
      (acc, cur) => (cur.completed ? acc + 1 : acc),
      0
    )
    const numInCompleted = notes.length - numCompleted
    return (
      <>
        {numCompleted > 0 && (
          <div
            style={{
              backgroundColor: 'hsl(61, 25%, 81%)',
              paddingLeft: '0.5rem',
              borderTop: '1px outset white',
              borderBottom: '1px outset white',
              color: 'black',
            }}
          >
            {numCompleted}
          </div>
        )}
        {numInCompleted > 0 && (
          <div
            style={{
              backgroundColor: 'hsl(61, 100%, 81%)',
              paddingLeft: '0.5rem',
              borderTop: '1px outset white',
              borderBottom: '1px outset white',
              color: 'black',
            }}
          >
            {numInCompleted}
          </div>
        )}
      </>
    )
  }
  const numNotes = notes.length
  const firstFew = 3
  if (numNotes < firstFew) {
    return notes.map((note) => (
      <div
        key={note._id}
        style={{
          backgroundColor: note.completed
            ? 'hsl(61, 25%, 81%)'
            : 'hsl(61, 100%, 81%)',
          paddingLeft: '0.5rem',
          borderTop: '1px outset white',
          borderBottom: '1px outset white',
          color: 'black',
        }}
      >
        {note.title.length > 10 ? `${note.title.slice(0, 10)}...` : note.title}
      </div>
    ))
  }
  const firstFewNotes = notes.slice(0, firstFew)
  return (
    <>
      {firstFewNotes.map((note) => (
        <div
          key={note._id}
          style={{
            backgroundColor: note.completed
              ? 'hsl(61, 25%, 81%)'
              : 'hsl(61, 100%, 81%)',
            paddingLeft: '0.5rem',
            borderTop: '1px outset white',
            borderBottom: '1px outset white',
            color: 'black',
          }}
        >
          {note.title.length > 10
            ? `${note.title.slice(0, 10)}...`
            : note.title}
        </div>
      ))}
      <div
        style={{ textAlign: 'right', paddingRight: '0.5rem', color: 'black' }}
      >
        more...
      </div>
    </>
  )
}

export default NotesMonthView
