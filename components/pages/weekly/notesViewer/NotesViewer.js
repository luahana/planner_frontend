import React from 'react'
import styles from './notes_viewer.module.css'
import Header from './Header'

const NotesViewer = ({ curDate, weekday, content, onAddNewClicked }) => {
  return (
    <div
      className={`${styles.wrapper} ${
        curDate.toDateString() === new Date().toDateString() && styles.today
      }`}
    >
      <Header
        weekday={weekday}
        curDate={curDate}
        onAddNewClicked={onAddNewClicked}
      />
      <div className={styles.notes}>{content}</div>
    </div>
  )
}

export default NotesViewer
