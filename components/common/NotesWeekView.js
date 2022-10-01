import React from 'react'
import styled from 'styled-components'
import { MONTH, WEEKDAY } from '../../config/calendar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { device } from '../../config/deviceBreakpoint'

const WeekWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-top: 1px solid black;
  width: 100%;
`
const WeekDateWrapper = styled.div`
  width: 20%;
`

const WeekNoteWrapper = styled.div`
  width: 100%;
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`

const NotesWeekView = ({ fullDay, weekday, content, onAddNewClicked }) => {
  const dt = new Date(fullDay)
  const year = dt.getFullYear()
  const month = dt.getMonth() + 1
  const date = dt.getDate()

  return (
    <WeekWrapper>
      <WeekDateWrapper>
        <div>{WEEKDAY[weekday]}</div>
        <div>
          {MONTH[month]} {date}
        </div>
        <div onClick={() => onAddNewClicked(year, month, date)}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </WeekDateWrapper>
      <WeekNoteWrapper>{content}</WeekNoteWrapper>
    </WeekWrapper>
  )
}

export default NotesWeekView
