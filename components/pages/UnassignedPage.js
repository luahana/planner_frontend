import React, { useState } from 'react'
import styled from 'styled-components'
import useUserAuth from '../../hooks/useUserAuth'
import { device } from '../../config/deviceBreakpoint'
import DayNotes from '../common/DayNotes'

const Wrapper = styled.div`
  width: 100%;
  @media ${device.tablet} {
  }
`

const TitleDiv = styled.div`
  text-align: center;
  font-size: 2.5rem;
`

const UnassignedPage = () => {
  const userId = useUserAuth()
  const fullDay = new Date(1111, 10, 11).toDateString()

  return (
    <>
      <Wrapper>
        <TitleDiv>Unassigned Notes</TitleDiv>
        <DayNotes view='unassigned' userId={userId} fullDay={fullDay} />
      </Wrapper>
    </>
  )
}

export default UnassignedPage
