import React from 'react'
import styles from './title.module.css'
import { WEEKDAY } from '../../../config/calendar'
import { ymdFromDate } from '../../../lib/date'

type Props = {
  curDate: Date
}

const Title = ({ curDate }: Props) => {
  const { year, month, date } = ymdFromDate(curDate)
  return (
    <div className={styles.wrapper}>
      {' '}
      {year}{' '}
      <span className={styles.oneline}>
        {month} {date}
      </span>{' '}
      {WEEKDAY[curDate.getDay() + 1]}
    </div>
  )
}

export default Title
