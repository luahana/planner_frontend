import React, { memo } from 'react'
import useUserAuth from '../../../hooks/useUserAuth'
import {
  weekArrByWid,
  calcWeekId,
  getDayOfPrevWeek,
  getDayOfNextWeek,
} from '../../../lib/calendar'
import Header from '../common/Header'
import styled from 'styled-components'
import Title from './Title'
import Main from './Main'

const Wrapper = styled.div`
  padding: 0 1rem;
`

const WeeklyPage = ({ wid }) => {
  const userId = useUserAuth()
  const curWeekArr = weekArrByWid(wid)[wid]

  return (
    <Wrapper>
      <Header
        title={<Title view='weekly' wid={wid} />}
        prev={`/weekly/${calcWeekId(getDayOfPrevWeek(curWeekArr[0]))}`}
        next={`/weekly/${calcWeekId(
          getDayOfNextWeek(curWeekArr[curWeekArr.length - 1])
        )}`}
      />
      <Main curWeekArr={curWeekArr} userId={userId} />
    </Wrapper>
  )
}

const MemoizedWeeklyPage = memo(WeeklyPage)

export default MemoizedWeeklyPage
