import React from 'react'
import styled from 'styled-components'
import { ymdFromMid } from '../../../lib/date'
import { calcMid } from '../../../lib/calendar'
import Header from '../common/Header'
import { device } from '../../../config/deviceBreakpoint'
import Main from './Main'

const Wrapper = styled.div`
  max-width: 100%;
  @media ${device.tablet} {
  }
`

const MonthlyPage = ({ mid }) => {
  const { year, month } = ymdFromMid(mid)

  return (
    <Wrapper>
      <Header
        title={`${year} ${month}`}
        prev={`/monthly/${calcMid(mid, -1)}`}
        next={`/monthly/${calcMid(mid, 1)}`}
      />
      <Main mid={mid} />
    </Wrapper>
  )
}

export default MonthlyPage
