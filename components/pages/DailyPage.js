import React, { memo } from 'react'
import useUserAuth from '../../hooks/useUserAuth'
import { calcDid } from '../../lib/calendar'
import PagesHeader from '../common/PagesHeader'
import DayNotes from '../common/DayNotes'
import { WEEKDAY } from '../../config/calendar'
import styled from 'styled-components'

const TitleDiv = styled.div`
  text-align: center;
`

const DailyPage = ({ did }) => {
  const userId = useUserAuth()
  const didYear = parseInt(did.slice(0, 4))
  const didMonth = parseInt(did.slice(4, 6))
  const didDate = parseInt(did.slice(-2))
  const dt = new Date(didYear, didMonth - 1, didDate)
  const fullDay = dt.toDateString()
  const title = (
    <TitleDiv>
      {didYear}{' '}
      <span style={{ whiteSpace: 'nowrap' }}>
        {didMonth} {didDate}
      </span>{' '}
      {WEEKDAY[dt.getDay() + 1]}
    </TitleDiv>
  )

  return (
    <div>
      <PagesHeader
        title={title}
        prev={`/daily/${calcDid(did, -1)}`}
        next={`/daily/${calcDid(did, 1)}`}
      />
      <div>
        <DayNotes view='day' userId={userId} fullDay={fullDay} />
      </div>
    </div>
  )
}

const MemoizedDailyPage = memo(DailyPage)

export default MemoizedDailyPage
