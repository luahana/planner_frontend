import React from 'react'
import styled from 'styled-components'
import { MONTH, WEEKDAY } from '../../config/calendar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { device } from '../../config/deviceBreakpoint'

const WeekWrapper = styled.div`
  display: flex;
  padding: 1rem;
  margin-bottom: 2rem;
  border-top: 2px solid #e6e7e8;
  width: 100%;
`
const WeekDateWrapper = styled.div`
  padding-right: 1rem;
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
const AddNewDiv = styled.div`
  background-color: #7afcff;
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
`

const NotesWeekView = ({
  curDateStr,
  weekday,
  content,
  onAddNewClicked,
  loadingComp,
  loading,
}) => {
  const dt = new Date(curDateStr)
  const year = dt.getFullYear()
  const month = dt.getMonth() + 1
  const date = dt.getDate()

  const today = new Date()
  const todayDateStr = today.toDateString()
  if (loading) {
    content = loadingComp
  }
  return (
    <WeekWrapper
      style={{
        border: curDateStr === todayDateStr && '3px double black',
      }}
    >
      <WeekDateWrapper>
        <div>
          <div>{WEEKDAY[weekday]}</div>
          <div>
            {MONTH[month]} {date}
          </div>
        </div>
        <AddNewDiv onClick={() => onAddNewClicked(year, month, date)}>
          <FontAwesomeIcon icon={faPlus} />
        </AddNewDiv>
      </WeekDateWrapper>
      <WeekNoteWrapper>{content}</WeekNoteWrapper>
    </WeekWrapper>
  )
}

export default NotesWeekView
