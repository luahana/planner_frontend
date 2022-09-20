import React, { useState, useEffect } from 'react'

const Time = () => {
  const [time, setTime] = useState()
  const date = new Date()

  useEffect(() => {
    const timer = setInterval(
      () =>
        setTime(
          new Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
            timeStyle: 'long',
          }).format(date)
        ),
      1000
    )
    return () => {
      clearInterval(timer)
    }
  }, [time])

  return <h2>{time}</h2>
}

export default Time
