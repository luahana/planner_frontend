import React from 'react'
import styles from './title.module.css'
import { ymw, ymwFromWid } from '../../../lib/date'

type Props = {
  wid: string
}

const Title = ({ wid }: Props) => {
  const { year, month, week }: ymw = ymwFromWid(wid)
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
