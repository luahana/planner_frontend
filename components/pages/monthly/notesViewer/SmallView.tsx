import React from 'react'
import styles from './small_view.module.css'
import Note from '../../../../lib/note'

type Props = {
  notes: Note[]
}

const SmallView = ({ notes }: Props) => {
  const numCompleted = notes.reduce(
    (acc: number, cur: Note) => (cur.completed ? acc + 1 : acc),
    0
  )
  const numIncompleted: number = notes.length - numCompleted
  return (
    <>
      {numIncompleted > 0 && (
        <div className={styles.note}>{numIncompleted}</div>
      )}
      {numCompleted > 0 && (
        <div className={`${styles.note} ${styles.completed}`}>
          {numCompleted}
        </div>
      )}
    </>
  )
}

export default SmallView
