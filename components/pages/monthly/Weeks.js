import React from 'react'
import styled from 'styled-components'
import { widsMonth } from '../../../lib/calendar'
import Link from 'next/link'

const Wrapper = styled.div`
  flex-basis: 5%;
`
const WeekDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem 0;
  margin-right: 1rem;
  background-color: #7afcff;
  height: 13rem;
  cursor: pointer;
  padding: 0.5rem;
`
const MonthDiv = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`
const StrDiv = styled.div`
  writing-mode: vertical-rl;
  text-orientation: upright;
`
const WeekNumDiv = styled.div`
  text-align: center;
`

const EmptyDiv = styled.div`
  height: 2rem;
`

const Weeks = ({ year, month, string }) => {
  return (
    <Wrapper>
      <EmptyDiv></EmptyDiv>
      {widsMonth({ year, month }).map((wid) => (
        <Link key={wid} href={`/weekly/${wid}`}>
          <WeekDiv style={{ height: string.length === 2 && '7rem' }}>
            <MonthDiv>{`${wid.slice(4, 6)}`}</MonthDiv>
            <StrDiv>{string}</StrDiv>
            <WeekNumDiv>{`${wid.slice(-1)}`}</WeekNumDiv>
          </WeekDiv>
        </Link>
      ))}
    </Wrapper>
  )
}

export default Weeks
