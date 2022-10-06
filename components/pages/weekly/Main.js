import React from 'react'
import Notes from './Notes'

const Main = ({ curWeekArr, userId }) => {
  return (
    <>
      {curWeekArr.map((day, i) => (
        <Notes
          key={day}
          userId={userId}
          curDate={new Date(day)}
          weekday={i + 1}
        />
      ))}
    </>
  )
}

export default Main
