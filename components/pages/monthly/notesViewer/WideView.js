import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './wide_view.module.css'
import NoteTitle from './NoteTitle'

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
            <div
              className={`${styles.note} ${styles.completed}`}
              key={note._id}
            >
              <NoteTitle note={note} />
            </div>
          )
        return (
          <div className={styles.note} key={note._id}>
            <NoteTitle note={note} />
          </div>
        )
      })}
      {numNotes > maxNotes && <div className={styles.more}>more...</div>}
    </>
  )
}

export default WideView
