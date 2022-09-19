import React from 'react'
import styled from 'styled-components'
import useUserAuth from '../../hooks/useUserAuth'
import { useGetCalendarQuery } from '../../redux/slice/api/calendarApiSlice'
import Weekday from '../Weekday'

const WeeklyPage = ({ wid }) => {
  const today = new Date()
  useUserAuth()
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
    const curWeekDays = calendar.filter((day) => day.week === parseInt(wid))
    console.log(curWeekDays)
    content = curWeekDays.map(({ month, day, weekday }) => (
      <Weekday month={month} day={day} weekday={weekday} />
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
