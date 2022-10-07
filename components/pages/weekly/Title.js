import React from 'react'
import styles from './title.module.css'
import { ymwFromWid } from '../../../lib/date'

const Title = ({ wid }) => {
  const { year, month, week } = ymwFromWid(wid)
  return (
    <div className={styles.wrapper}>
      {' '}
      {year}{' '}
      <span style={{ whiteSpace: 'nowrap' }}>
        {month} {week}
      </span>
    </div>
  )
}

export default Title
