import React from 'react'
import Notes from './Notes'

type Props = {
  curWeekArr: string[]
  userId: string
}

const Main = ({ curWeekArr, userId }: Props) => {
  return (
    <>
      {curWeekArr.map((day: string, i: number) => (
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
