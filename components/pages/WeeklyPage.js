import React, { memo } from 'react'
import styled from 'styled-components'
import useUserAuth from '../../hooks/useUserAuth'
import { useGetCalendarQuery } from '../../redux/slice/api/calendarApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import MemoizedDayNotes from '../DayNotes'
import calcWeekid from '../../lib/calcWeekid'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const ArrowsWrapper = styled.div`
  display: flex;
`

const ArrowDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.5rem;
  cursor: pointer;
`

const WeeklyPage = ({ wid }) => {
  const user_id = useUserAuth()
  const {
    data: calendar,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetCalendarQuery()
  let content
  if (isLoading) content = <p>Loading...</p>
  if (isError) content = <p>Error {error?.data?.message}</p>

  if (!isLoading && isSuccess && user_id) {
    const curWeekDays = calendar.filter(
      (day) =>
        day.week === parseInt(wid.slice(-2)) &&
        day.year === parseInt(wid.slice(0, 4))
    )

    content = curWeekDays.map((curWeekDay) => (
      <MemoizedDayNotes
        key={curWeekDay.day}
        view='week'
        user_id={user_id}
        year={curWeekDay.year}
        month={curWeekDay.month}
        day={curWeekDay.day}
        weekday={curWeekDay.weekday}
      />
    ))
  }

  return (
    <div>
      <Header>
        <h1>
          {wid.slice(0, 4)} Week {wid.slice(-2)}
        </h1>
        <ArrowsWrapper>
          <Link href={`/weekly/${calcWeekid(wid, -1)}`}>
            <ArrowDiv>
              <FontAwesomeIcon icon={faArrowLeft} />
            </ArrowDiv>
          </Link>
          <Link href={`/weekly/${calcWeekid(wid, 1)}`}>
            <ArrowDiv>
              <FontAwesomeIcon icon={faArrowRight} />
            </ArrowDiv>
          </Link>
        </ArrowsWrapper>
      </Header>
      <div>{content}</div>
    </div>
  )
}

const MemoizedWeeklyPage = memo(WeeklyPage)

export default MemoizedWeeklyPage
