import React from 'react'
import styled from 'styled-components'
import { device } from '../../config/deviceBreakpoint'

const DayWrapper = styled.div`
  width: 100%;
  @media ${device.tablet} {
  }
`

const DayHeader = styled.div`
  padding: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
  @media ${device.tablet} {
  }
`

const DayNewNoteBtnDiv = styled.div``

const DayMain = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`

const NotesUnassignedView = ({ content, onAddNewClicked }) => {
  return (
    <DayWrapper>
      <DayHeader>
        <DayNewNoteBtnDiv>
          <button onClick={() => onAddNewClicked(1111, 11, 11)}>
            New Note
          </button>
        </DayNewNoteBtnDiv>
      </DayHeader>
      <DayMain>{content}</DayMain>
    </DayWrapper>
  )
}

export default NotesUnassignedView
