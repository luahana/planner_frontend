import React from 'react'
import { ymdFromMid } from '../../../lib/date'
import { calcMid } from '../../../lib/calendar'
import Header from '../common/Header'
import Main from './Main'

const MonthlyPage = ({ mid }) => {
  const { year, month } = ymdFromMid(mid)

  return (
    <div>
      <Header
        title={`${year} ${month}`}
        prev={`/monthly/${calcMid(mid, -1)}`}
        next={`/monthly/${calcMid(mid, 1)}`}
      />
      <Main mid={mid} />
    </div>
  )
}

export default MonthlyPage
