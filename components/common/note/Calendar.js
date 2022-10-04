import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import {
  weekdays,
  fullMonthArray,
  convertDateStrToDid,
  calcMid,
} from '../../../lib/calendar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #ff7eb9;
  position: absolute;
  top: 0;
  z-index: 100;
`

const DayOfWeekWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
`

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  & button:first-child {
    grid-column: 5;
  }
`

const DayOfWeekDiv = styled.div`
  margin: 0.5rem;
  text-align: center;
`

const DayDiv = styled.div`
  margin: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DayDivDate = styled.div``
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const MidArrow = styled.div`
  display: flex;
  align-items: center;
`

const ArrowDiv = styled.div`
  margin: 1rem;
  cursor: pointer;
`

const MoveDiv = styled.div`
  margin-right: 2rem;
  background-color: #7afcff;
  padding: 0.1rem 0.4rem;
  cursor: pointer;
`

const Calendar = ({ mid, fullDay, handleChangeDate, setShowCal }) => {
  const [curMid, setCurMid] = useState(mid)
  const midYear = parseInt(curMid.slice(0, 4))
  const midMonth = parseInt(curMid.slice(4, 6))
  let fullMonthArr = fullMonthArray(midYear, midMonth)
  const curDid = convertDateStrToDid(fullDay)
  const [selectedDay, setSelectedDay] = useState(curDid)
  const selectedDayDate = new Date(
    parseInt(selectedDay.slice(0, 4)),
    parseInt(selectedDay.slice(4, 6) - 1),
    parseInt(selectedDay.slice(-2))
  )

  useEffect(() => {
    fullMonthArr = fullMonthArray(midYear, midMonth)
  }, [curMid])

  const onChnageClicked = () => {
    handleChangeDate(new Date(fullDay), selectedDayDate)
    setShowCal(false)
  }
  return (
    <CalendarWrapper>
      <Header>
        <MidArrow>
          <ArrowDiv onClick={() => setCurMid(calcMid(curMid, -1))}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </ArrowDiv>
          {`${midYear} ${midMonth.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
          })}`}
          <ArrowDiv onClick={() => setCurMid(calcMid(curMid, 1))}>
            <FontAwesomeIcon icon={faChevronRight} />
          </ArrowDiv>
        </MidArrow>
        <MoveDiv onClick={onChnageClicked}>Select</MoveDiv>
      </Header>
      <DayOfWeekWrapper>
        {weekdays.map((weekday) => (
          <DayOfWeekDiv key={weekday}>{weekday.slice(0, 3)}</DayOfWeekDiv>
        ))}
      </DayOfWeekWrapper>
      <DateGrid>
        {fullMonthArr.map((day) => {
          const dt = new Date(day)
          const dayMonth = dt.getMonth() + 1
          const dayDateStr = dt.toDateString()
          const today = new Date()
          const todayDateStr = today.toDateString()
          return (
            <DayDiv
              key={day}
              onClick={() => setSelectedDay(convertDateStrToDid(day))}
              style={{
                backgroundColor:
                  convertDateStrToDid(day) === selectedDay && '#7afcff',
                color: dayMonth !== midMonth && 'white',
                border: dayDateStr === todayDateStr && '3px double black',
              }}
            >
              <DayDivDate>{new Date(day).getDate()}</DayDivDate>
            </DayDiv>
          )
        })}
      </DateGrid>
    </CalendarWrapper>
  )
}

export default Calendar
