import React from 'react'
import styles from './header.module.css'
import { MONTH, WEEKDAY } from '../../../../config/calendar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ymdFromDate } from '../../../../lib/date'

const Header = ({ weekday, curDate, addNewNote }) => {
  const { month, date } = ymdFromDate(curDate)

  return (
    <div className={styles.wrapper}>
      <div>{WEEKDAY[weekday]}</div>
      <div>
        {MONTH[month]} {date}
      </div>
      <div className={styles.addNew} onClick={() => addNewNote()}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  )
}

export default Header
