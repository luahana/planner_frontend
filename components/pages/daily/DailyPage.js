import React, { memo } from 'react'
import useUserAuth from '../../../hooks/useUserAuth'
import { calcDid } from '../../../lib/calendar'
import { dateFromDid } from '../../../lib/date'
import Header from '../common/Header'
import Title from './Title'
import Main from './Main'

const DailyPage = ({ did }) => {
  const userId = useUserAuth()
  const curDate = dateFromDid(did)

  return (
    <>
      <Header
        title={<Title curDate={curDate} />}
        prev={`/daily/${calcDid(did, -1)}`}
        next={`/daily/${calcDid(did, 1)}`}
      />
      <Main userId={userId} curDate={curDate} />
    </>
  )
}

const MemoizedDailyPage = memo(DailyPage)

export default MemoizedDailyPage
