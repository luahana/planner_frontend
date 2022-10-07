import React from 'react'
import styles from './show_view.module.css'

const ShowView = ({ title, content }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{content}</div>
    </div>
  )
}

export default ShowView
