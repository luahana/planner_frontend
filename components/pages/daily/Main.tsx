import React from 'react'
import Notes from './Notes'

type Props = {
  userId: string
  curDate: Date
}

const Main = ({ userId, curDate }: Props) => {
  return (
    <>
      <Notes userId={userId} curDate={curDate} />
    </>
  )
}

export default Main
