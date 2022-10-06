import React from 'react'
import styled from 'styled-components'
import Notes from './Notes'
import { didFromDateStr, ymdFromMid } from '../../../lib/date'
import useUserAuth from '../../../hooks/useUserAuth'
import Link from 'next/link'

const Wrapper = styled.div`
  border: 1px solid #e6e7e8;
  margin: 0.5rem;
  height: 13rem;
  max-width: 7.5rem;
  cursor: pointer;
  justify-self: stretch;
`

const DateDiv = styled.div`
  text-align: right;
  padding: 0.3rem 0.5rem 0 0;
`
const Day = ({ view, day, mid }) => {
  const userId = useUserAuth()
  const { month } = ymdFromMid(mid)
  const dt = new Date(day)
  const dayMonth = dt.getMonth() + 1

  return (
    <Link key={day} href={`/daily/${didFromDateStr(day)}`}>
      <Wrapper
        key={day}
        style={{
          backgroundColor: dayMonth !== month && '#e6e7e8',
          border: dayMonth !== month && 'none',
          color: dayMonth !== month && 'white',
          border: day === new Date().toDateString() && '3px double black',
          height: view === 'monthSmall' && '7rem',
        }}
      >
        <DateDiv>{dt.getDate()}</DateDiv>
        {view === 'month' && (
          <Notes view='month' userId={userId} curDate={dt} />
        )}
        {view === 'monthSmall' && (
          <Notes view='monthSmall' userId={userId} curDate={dt} />
        )}
      </Wrapper>
    </Link>
  )
}

export default Day
