import React from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import styles from './edit_view.module.css'

const EditView = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  handleSaveNote,
  isLoading,
}) => {
  return (
    <div className={styles.wrapper}>
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
      <div className={styles.saveWrapper}>
        {isLoading && (
          <div className={styles.loaderWrapper}>
            <PulseLoader
              color='#ff7eb9'
              size='2rem'
              aria-label='Loading Spinner'
            />
          </div>
        )}
        <div className={styles.save} onClick={handleSaveNote}>
          Save
        </div>
      </div>
    </div>
  )
}

export default EditView
