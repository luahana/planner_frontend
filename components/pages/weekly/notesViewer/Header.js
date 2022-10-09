import React, { useState, useEffect } from 'react'
import styles from './header.module.css'
import { MONTH, WEEKDAY } from '../../../../config/calendar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ymdFromDate } from '../../../../lib/date'
import { device } from '../../../../config/deviceBreakpoint'

const Header = ({ weekday, curDate, addNewNote }) => {
  const { month, date } = ymdFromDate(curDate)
  const [matches, setMatches] = useState(
    window.matchMedia(device.mobileL).matches
  )

  useEffect(() => {
    window
      .matchMedia(device.tablet)
      .addEventListener('change', (e) => setMatches(e.matches))
  })

  return (
    <div className={styles.wrapper}>
      <div>{matches ? WEEKDAY[weekday] : WEEKDAY[weekday].slice(0, 3)}</div>
      <div>
        {matches ? MONTH[month] : MONTH[month].slice(0, 3)} {date}
      </div>
      <div className={styles.addNew} onClick={() => addNewNote()}>
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  )
}

export default Header
