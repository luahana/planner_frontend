import React, { memo } from 'react'
import useUserAuth from '../../../hooks/useUserAuth'
import {
  weekArrByWid,
  calcWeekId,
  getDayOfPrevWeek,
  getDayOfNextWeek,
} from '../../../lib/calendar'
import Header from '../common/Header'
import styles from './weekly_page.module.css'
import Title from './Title'
import Main from './Main'

type Props = {
  wid: string
}

const WeeklyPage = ({ wid }: Props) => {
  const userId: string = useUserAuth()
  const curWeekArr: string[] = weekArrByWid(wid)[wid]

  return (
    <div className={styles.wrapper}>
      <Header
        title={<Title wid={wid} />}
        prev={`/weekly/${calcWeekId(getDayOfPrevWeek(curWeekArr[0]))}`}
        next={`/weekly/${calcWeekId(
          getDayOfNextWeek(curWeekArr[curWeekArr.length - 1])
        )}`}
      />
      <Main curWeekArr={curWeekArr} userId={userId} />
    </div>
  )
}

const MemoizedWeeklyPage = memo(WeeklyPage)

export default MemoizedWeeklyPage
