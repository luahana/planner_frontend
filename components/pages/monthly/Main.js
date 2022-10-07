import React, { useState, useEffect } from 'react'
import styles from './main.module.css'
import { getCalDates } from '../../../lib/calendar'
import { ymdFromMid } from '../../../lib/date'
import { device } from '../../../config/deviceBreakpoint'
import Weeks from './Weeks'
import Calendar from '../../calendar/Calendar'

const Main = ({ mid }) => {
  const { year, month } = ymdFromMid(mid)
  const calDates = getCalDates(mid)
  const [matches, setMatches] = useState(
    window.matchMedia(device.tablet).matches
  )
  useEffect(() => {
    window
      .matchMedia(device.tablet)
      .addEventListener('change', (e) => setMatches(e.matches))
  })
  return (
    <>
      {matches && (
        <div className={styles.wrapper}>
          <Weeks year={year} month={month} string='Week' />
          <Calendar
            weekdaysView='full'
            view='month'
            calDates={calDates}
            mid={mid}
          />
        </div>
      )}
      {!matches && (
        <div className={styles.wrapper}>
          <Weeks year={year} month={month} string='Wk' />
          <Calendar view='monthSmall' calDates={calDates} mid={mid} />
        </div>
      )}
    </>
  )
}

export default Main
