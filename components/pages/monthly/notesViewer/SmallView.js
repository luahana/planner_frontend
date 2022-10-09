import React from 'react'
import styles from './small_view.module.css'

const SmallView = ({ notes }) => {
  const numCompleted = notes.reduce(
    (acc, cur) => (cur.completed ? acc + 1 : acc),
    0
  )
  const numIncompleted = notes.length - numCompleted
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
