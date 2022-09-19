import React from 'react'
import styled from 'styled-components'
import useUserAuth from '../../hooks/useUserAuth'
import { useGetCalendarQuery } from '../../redux/slice/api/calendarApiSlice'
import Weekday from '../Weekday'

const WeeklyPage = ({ wid }) => {
  const today = new Date()
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
  if (!isLoading && isSuccess) {
    const curWeekDays = calendar.filter(
      (day) =>
        day.week === parseInt(wid.slice(-2)) &&
        day.year === parseInt(wid.slice(0, 4))
    )
    console.log(curWeekDays)
    content = curWeekDays.map(({ month, day, weekday, year }) => (
      <Weekday
        user_id={user_id}
        month={month}
        day={day}
        weekday={weekday}
        year={year}
      />
    ))
  }
  return (
    <div>
      <h1>
        {today.getFullYear()} Week {wid}
      </h1>
      <div>{content}</div>
    </div>
  )
}

export default WeeklyPage
