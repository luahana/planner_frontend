import React from 'react'
import styled from 'styled-components'
import { didFromDateStr, ymdFromMid } from '../../../lib/date'

const Wrapper = styled.div`
  margin: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Day = ({ day, selectedDid, setSelectedDid, mid }) => {
  const { month } = ymdFromMid(mid)
  const dt = new Date(day)
  return (
    <Wrapper
      key={day}
      onClick={() => setSelectedDid(didFromDateStr(day))}
      style={{
        backgroundColor: didFromDateStr(day) === selectedDid && '#7afcff',
        color: dt.getMonth() + 1 !== month && 'white',
        border:
          dt.toDateString() === new Date().toDateString() && '3px double black',
      }}
    >
      <div>{new Date(day).getDate()}</div>
    </Wrapper>
  )
}

export default Day
