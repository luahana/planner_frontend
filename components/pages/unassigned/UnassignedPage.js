import React from 'react'
import styled from 'styled-components'
import useUserAuth from '../../../hooks/useUserAuth'
import { device } from '../../../config/deviceBreakpoint'
import Notes from './Notes'

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

  return (
    <>
      <Wrapper>
        <TitleDiv>Unassigned Notes</TitleDiv>
        <Notes userId={userId} curDate={new Date()} />
      </Wrapper>
    </>
  )
}

export default UnassignedPage
