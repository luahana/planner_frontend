import React from 'react'
import styles from './notes_viewer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const NotesViewer = ({ content, onAddNewClicked, loadingComp, loading }) => {
  if (loading) {
    content = loadingComp
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.addNew} onClick={() => onAddNewClicked()}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <div className={styles.main}>{content}</div>
    </div>
  )
}

export default NotesViewer
