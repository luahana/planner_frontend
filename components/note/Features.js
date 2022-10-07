import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faPenToSquare,
  faCalendarDays,
  faArrowTurnUp,
} from '@fortawesome/free-solid-svg-icons'
import styles from './features.module.css'

const Features = ({
  view,
  handleEdit,
  handleEditDate,
  handleUnassign,
  handleDelete,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.feature} onClick={handleEdit}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </div>
      <div className={styles.feature} onClick={handleEditDate}>
        <FontAwesomeIcon icon={faCalendarDays} />
      </div>
      {view !== 'unassigned' && (
        <div className={styles.feature} onClick={handleUnassign}>
          <FontAwesomeIcon icon={faArrowTurnUp} />
        </div>
      )}

      <div className={styles.feature} onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  )
}

export default Features
