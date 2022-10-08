import React from 'react'
import styles from './show_view.module.css'

const ShowView = ({ note }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{note.title}</div>
      <div className={styles.content}>{note.content}</div>
    </div>
  )
}

export default ShowView
