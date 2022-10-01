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

  return (
    <div>
      <PagesHeader
        title={`${widYear} ${widMonth} Week${widWeek}`}
        prev={`/weekly/${calcWeekId(prevYear, prevMonth, prevDate)}`}
        next={`/weekly/${calcWeekId(nextYear, nextMonth, nextDate)}`}
      />
      <div>
        {curWeekArr.map((day, i) => (
          <DayNotes
            key={day}
            view='week'
            userId={userId}
            fullDay={day}
            weekday={i + 1}
          />
        ))}
      </div>
    </div>
  )
}

const MemoizedWeeklyPage = memo(WeeklyPage)

export default MemoizedWeeklyPage
