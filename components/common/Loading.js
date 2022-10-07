import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import styles from './loading.module.css'

const Loading = ({ size }) => {
  return (
    <div className={styles.wrapper}>
      <ClipLoader color='aqua' size={size} aria-label='Loading Spinner' />
    </div>
  )
}

export default Loading
