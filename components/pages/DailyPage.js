import React, { memo } from 'react'
import useUserAuth from '../../hooks/useUserAuth'
import { calcDid } from '../../lib/calendar'
import PagesHeader from '../common/PagesHeader'
import DayNotes from '../common/DayNotes'

const DailyPage = ({ did }) => {
  const userId = useUserAuth()
  const didYear = parseInt(did.slice(0, 4))
  const didMonth = parseInt(did.slice(4, 6))
  const didDate = parseInt(did.slice(-2))
  const fullDay = new Date(didYear, didMonth - 1, didDate).toDateString()

  return (
    <div>
      <PagesHeader
        title={`${didYear} ${didMonth} ${didDate}`}
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
