import React from 'react'
import styled from 'styled-components'
import { WEEKDAY } from '../../config/calendar'

const TitleDiv = styled.div`
  text-align: center;
`
const Title = ({ year, month, date, curDate }) => {
  return (
    <TitleDiv>
      {year}{' '}
      <span style={{ whiteSpace: 'nowrap' }}>
        {month} {date}
      </span>{' '}
      {WEEKDAY[curDate.getDay() + 1]}
    </TitleDiv>
  )
}

export default Title
