import React from 'react'
import styled from 'styled-components'
import { device } from '../../../../config/deviceBreakpoint'
import Header from './Header'

const Wrapper = styled.div`
  display: flex;
  padding: 1rem;
  margin-bottom: 2rem;
  border-top: 2px solid #e6e7e8;
  width: 100%;
`

const NotesDiv = styled.div`
  width: 100%;
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`

const NotesViewer = ({ curDate, weekday, content, onAddNewClicked }) => {
  return (
    <Wrapper
      style={{
        border:
          curDate.toDateString() === new Date().toDateString() &&
          '3px double black',
      }}
    >
      <Header
        weekday={weekday}
        curDate={curDate}
        onAddNewClicked={onAddNewClicked}
      />
      <NotesDiv>{content}</NotesDiv>
    </Wrapper>
  )
}

export default NotesViewer
