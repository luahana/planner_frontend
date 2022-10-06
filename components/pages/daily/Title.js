import React from 'react'
import styled from 'styled-components'
import { WEEKDAY } from '../../../config/calendar'
import { ymdFromDate } from '../../../lib/date'

const Wrapper = styled.div`
  text-align: center;
`
const Title = ({ curDate }) => {
  const { year, month, date } = ymdFromDate(curDate)
  return (
    <Wrapper>
      {' '}
      {year}{' '}
      <span style={{ whiteSpace: 'nowrap' }}>
        {month} {date}
      </span>{' '}
      {WEEKDAY[curDate.getDay() + 1]}
    </Wrapper>
  )
}

export default Title
