import React from 'react'
import styles from './show_view.module.css'
import Note from '../../lib/note'

type Props = {
  note: Note
}

const ShowView = ({ note }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{note.title}</div>
      <div className={styles.content}>{note.content}</div>
    </div>
  )
}

export default ShowView
