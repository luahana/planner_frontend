import React from 'react'
import useUserAuth from '../../hooks/useUserAuth'
import styled from 'styled-components'
import { weekdays, widsMonth, fullMonthArray } from '../../lib/calendar'
import Link from 'next/link'
import { calcMid, convertDateStrToDid } from '../../lib/calendar'
import PagesHeader from '../common/PagesHeader'
import DayNotes from '../common/DayNotes'

const Wrapper = styled.div`
  width: 100%;
`

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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
  border: 1px solid #e6e7e8;
  margin: 0.5rem;
  height: 13rem;
  width: 7.5rem;
  cursor: pointer;
`

const DayDivDate = styled.div`
  text-align: right;
  padding: 0.3rem 0.5rem 0 0;
`

const WeekDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem 0;
  margin-right: 1rem;
  background-color: #7afcff;
  height: 13rem;
  cursor: pointer;
  padding: 0.5rem;
`

const WeekMonthDiv = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`
const WeekMonthWeek = styled.div`
  writing-mode: vertical-rl;
  text-orientation: upright;
`
const WeekMonthWeekNum = styled.div`
  text-align: center;
`

const MonthlyPage = ({ mid }) => {
  const userId = useUserAuth()
  const midYear = parseInt(mid.slice(0, 4))
  const midMonth = parseInt(mid.slice(4, 6))
  const fullMonthArr = fullMonthArray(midYear, midMonth)

  return (
    <Wrapper>
      <PagesHeader
        title={`${midYear} ${midMonth}`}
        prev={`/monthly/${calcMid(mid, -1)}`}
        next={`/monthly/${calcMid(mid, 1)}`}
      />
      <CalendarWrapper>
        <div>
          <DayOfWeekDiv>Wk</DayOfWeekDiv>
          {widsMonth(midYear, midMonth).map((wid, index) => (
            <Link key={wid} href={`/weekly/${wid}`}>
              <WeekDiv>
                <WeekMonthDiv>{`${wid.slice(4, 6)}`}</WeekMonthDiv>
                <WeekMonthWeek>Week</WeekMonthWeek>
                <WeekMonthWeekNum>{`${wid.slice(-1)}`}</WeekMonthWeekNum>
              </WeekDiv>
            </Link>
          ))}
        </div>
        <div>
          <DayOfWeekWrapper>
            {weekdays.map((weekday) => (
              <DayOfWeekDiv key={weekday}>{weekday}</DayOfWeekDiv>
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
                <Link key={day} href={`/daily/${convertDateStrToDid(day)}`}>
                  <DayDiv
                    key={day}
                    style={{
                      backgroundColor: dayMonth !== midMonth && '#e6e7e8',
                      border: dayMonth !== midMonth && 'none',
                      color: dayMonth !== midMonth && 'white',
                      border: dayDateStr === todayDateStr && '3px double black',
                    }}
                  >
                    <DayDivDate>{new Date(day).getDate()}</DayDivDate>
                    <DayNotes view='month' userId={userId} fullDay={day} />
                  </DayDiv>
                </Link>
              )
            })}
          </DateGrid>
        </div>
      </CalendarWrapper>
    </Wrapper>
  )
}

export default MonthlyPage
