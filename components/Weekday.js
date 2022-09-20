import React from 'react'
import styled from 'styled-components'
import { device } from '../config/deviceBreakpoint'
import DayNotes from './DayNotes'

const Weekday = ({ user_id, month, day, weekday, year }) => {
  return (
    <>
      <DayNotes
        view='week'
        user_id={user_id}
        month={month - 1}
        day={day}
        weekday={weekday}
        year={year}
      />
    </>
  )
}

export default Weekday
