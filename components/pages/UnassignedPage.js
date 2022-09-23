import React, { useState } from 'react'
import styled from 'styled-components'
import useUserAuth from '../../hooks/useUserAuth'
import { device } from '../../config/deviceBreakpoint'
import DayNotes from '../DayNotes'

const Wrapper = styled.div`
  width: 100%;
  @media ${device.tablet} {
  }
`

const UnassignedPage = () => {
  const user_id = useUserAuth()
  const today = new Date()
  const [month, day, year] = [
    today.getMonth(),
    today.getDate(),
    today.getFullYear(),
  ]

  return (
    <>
      <Wrapper>
        <DayNotes view='unassigned' user_id={user_id} month='' day='' year='' />
      </Wrapper>
    </>
  )
}

export default UnassignedPage
