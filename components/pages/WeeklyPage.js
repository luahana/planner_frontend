import React, { memo } from 'react'
import useUserAuth from '../../hooks/useUserAuth'
import {
  weekArrByWid,
  calcWeekId,
  getDayOfPrevWeek,
  getDayOfNextWeek,
} from '../../lib/calendar'
import PagesHeader from '../common/PagesHeader'
import DayNotes from '../common/DayNotes'
import styled from 'styled-components'

const TitleDiv = styled.div`
  text-align: center;
`

const Wrapper = styled.div`
  padding: 0 1rem;
`

const WeeklyPage = ({ wid }) => {
  const userId = useUserAuth()
  const widYear = wid.slice(0, 4)
  const widMonth = parseInt(wid.slice(4, 6))
  const widWeek = wid.slice(-1)
  const curWeekArr = weekArrByWid(wid)[wid]

  const { nextYear, nextMonth, nextDate } = getDayOfNextWeek(
    curWeekArr[curWeekArr.length - 1]
  )
  const { prevYear, prevMonth, prevDate } = getDayOfPrevWeek(curWeekArr[0])
  const title = (
    <TitleDiv>
      {widYear}{' '}
      <span style={{ whiteSpace: 'nowrap' }}>
        {widMonth} {widWeek}
      </span>
    </TitleDiv>
  )
  return (
    <Wrapper>
      <PagesHeader
        title={title}
        prev={`/weekly/${calcWeekId(prevYear, prevMonth, prevDate)}`}
        next={`/weekly/${calcWeekId(nextYear, nextMonth, nextDate)}`}
      />
      <div>
        {curWeekArr.map((day, i) => (
          <DayNotes
            key={day}
            view='week'
            userId={userId}
            curDateStr={day}
            weekday={i + 1}
          />
        ))}
      </div>
    </Wrapper>
  )
}

const MemoizedWeeklyPage = memo(WeeklyPage)

export default MemoizedWeeklyPage
