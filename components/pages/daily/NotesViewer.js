import React from 'react'
import styles from './notes_viewer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const NotesViewer = ({ content, addNewNote }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button className={styles.addNew} onClick={() => addNewNote()}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className={styles.main}>{content}</div>
    </div>
  )
}

export default NotesViewer
