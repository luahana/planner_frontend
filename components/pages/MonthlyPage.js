import React from 'react'
import useUserAuth from '../../hooks/useUserAuth'

const MonthlyPage = ({ mid }) => {
  useUserAuth()
  return (
    <div>
      <h1>MonthlyPage</h1>
      <p>{mid}</p>
    </div>
  )
}

export default MonthlyPage
