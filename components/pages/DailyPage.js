import React, { memo } from 'react'
import useUserAuth from '../../hooks/useUserAuth'
import { calcDid, didToYmd } from '../../lib/calendar'
import PagesHeader from '../common/PagesHeader'
import DayNotes from '../common/DayNotes'
import Title from '../common/Title'

const DailyPage = ({ did }) => {
  const userId = useUserAuth()
  const [year, month, date] = didToYmd(did)
  const curDate = new Date(year, month - 1, date)
  const curDateStr = curDate.toDateString()
  const title = (
    <Title year={year} month={month} date={date} curDate={curDate} />
  )

  return (
    <>
      <PagesHeader
        title={title}
        prev={`/daily/${calcDid(did, -1)}`}
        next={`/daily/${calcDid(did, 1)}`}
      />
      <DayNotes view='day' userId={userId} curDateStr={curDateStr} />
    </>
  )
}

const MemoizedDailyPage = memo(DailyPage)

export default MemoizedDailyPage
