import React from 'react'
import styles from './notes_viewer.module.css'
import Header from './Header'

type Props = {
  curDate: Date
  weekday: number
  content: React.ReactNode
  addNewNote: () => string
}

const NotesViewer = ({ curDate, weekday, content, addNewNote }: Props) => {
  return (
    <div
      className={`${styles.wrapper} ${
        curDate.toDateString() === new Date().toDateString() && styles.today
      }`}
    >
      <Header weekday={weekday} curDate={curDate} addNewNote={addNewNote} />
      <div className={styles.notes}>{content}</div>
    </div>
  )
}

export default NotesViewer
