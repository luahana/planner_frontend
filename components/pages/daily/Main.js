import React from 'react'
import Notes from './Notes'

const Main = ({ userId, curDate }) => {
  return (
    <>
      <Notes userId={userId} curDate={curDate} />
    </>
  )
}

export default Main
