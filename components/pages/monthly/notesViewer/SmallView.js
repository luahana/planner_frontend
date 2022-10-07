import React from 'react'
import styles from './small_view.module.css'

const SmallView = ({ notes }) => {
  const numCompleted = notes.reduce(
    (acc, cur) => (cur.completed ? acc + 1 : acc),
    0
  )
  const numInCompleted = notes.length - numCompleted
  return (
    <>
      {numCompleted > 0 && <div className={styles.note}>{numCompleted}</div>}
      {numInCompleted > 0 && (
        <div className={`${styles.note} ${styles.completed}`}>
          {numInCompleted}
        </div>
      )}
    </>
  )
}

export default SmallView
