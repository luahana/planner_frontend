import React from 'react'
import styled from 'styled-components'
import { MONTH, WEEKDAY } from '../config/calendar'

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
  background-color: yellow;
`

const Weekday = ({ month, day, weekday }) => {
  return (
    <Wrapper>
      <div>
        <div>{WEEKDAY[weekday]}</div>
        <div>
          {MONTH[month]} {day}
        </div>
      </div>
      <div>notes</div>
    </Wrapper>
  )
}

export default Weekday
