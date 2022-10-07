import React, { useEffect } from 'react'
import styles from './edit_view.module.css'

const EditView = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  handleSaveNote,
}) => {
  useEffect(() => {
    wrapperRef.current.focus()
  }, [])
  return (
    <div className={styles.wrapper} tabIndex={-1}>
      <input
        className={styles.title}
        type='text'
        value={title}
        onChange={onTitleChange}
      />
      <textarea
        className={styles.content}
        value={content}
        onChange={onContentChange}
      />
      <div className={styles.save} onClick={handleSaveNote}>
        Save
      </div>
    </div>
  )
}

export default EditView
