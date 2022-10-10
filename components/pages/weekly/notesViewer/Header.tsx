import React, { useState, useEffect } from 'react'
import styles from './header.module.css'
import { MONTH, WEEKDAY } from '../../../../config/calendar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ymd, ymdFromDate } from '../../../../lib/date'
import { device } from '../../../../config/deviceBreakpoint'

type Props = {
  weekday: number
  curDate: Date
  addNewNote: () => string
}

const Header = ({ weekday, curDate, addNewNote }: Props) => {
  const { month, date }: ymd = ymdFromDate(curDate)
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
      <button className={styles.addNew} onClick={() => addNewNote()}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}

export default Header
