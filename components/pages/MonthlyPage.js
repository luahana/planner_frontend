import React from 'react'
import useUserAuth from '../../hooks/useUserAuth'
import styled from 'styled-components'
import { weekdays, widsMonth, fullMonthArray } from '../../lib/calendar'
import Link from 'next/link'
import { calcMid, convertDateStrToDid } from '../../lib/calendar'
import PagesHeader from '../common/PagesHeader'
import DayNotes from '../common/DayNotes'

const CalendarWrapper = styled.div`
  display: flex;
`

const DayOfWeekWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
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
`

const DayDiv = styled.div`
  border: 1px solid grey;
  margin: 0.5rem;
  max-height: 30rem;
  min-height: 5rem;
`

const WeekDiv = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid black;
`

const MonthlyPage = ({ mid }) => {
  const userId = useUserAuth()
  const midYear = parseInt(mid.slice(0, 4))
  const midMonth = parseInt(mid.slice(4, 6))
  const fullMonthArr = fullMonthArray(midYear, midMonth)

  return (
    <div>
      <PagesHeader
        title={`${midYear} ${midMonth}`}
        prev={`/monthly/${calcMid(mid, -1)}`}
        next={`/monthly/${calcMid(mid, 1)}`}
      />
      <CalendarWrapper>
        <div>
          <DayOfWeekWrapper>
            {weekdays.map((weekday) => (
              <DayOfWeekDiv key={weekday}>{weekday}</DayOfWeekDiv>
            ))}
          </DayOfWeekWrapper>
          <DateGrid>
            {fullMonthArr.map((day) => (
              <Link key={day} href={`/daily/${convertDateStrToDid(day)}`}>
                <DayDiv key={day}>
                  <div>{new Date(day).getDate()}</div>
                  <DayNotes view='month' userId={userId} fullDay={day} />
                </DayDiv>
              </Link>
            ))}
          </DateGrid>
        </div>
        <div>
          {widsMonth(midYear, midMonth).map((wid, index) => (
            <Link key={wid} href={`/weekly/${wid}`}>
              <WeekDiv>{`week ${wid}`}</WeekDiv>
            </Link>
          ))}
        </div>
      </CalendarWrapper>
    </div>
  )
}

export default MonthlyPage
