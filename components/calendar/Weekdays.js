import React from 'react'
import styled from 'styled-components'
import { WEEKDAYS } from '../../lib/calendar'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
`
const WeekdayDiv = styled.div`
  margin: 0.5rem;
  text-align: center;
`
const Weekdays = ({ weekdaysView }) => {
  return (
    <Wrapper>
      {WEEKDAYS.map((weekday) => (
        <WeekdayDiv key={weekday}>
          {weekdaysView === 'full' ? weekday : weekday.slice(0, 3)}
        </WeekdayDiv>
      ))}
    </Wrapper>
  )
}

export default Weekdays
