import React from 'react'
import styled from 'styled-components'
import { device } from '../../config/deviceBreakpoint'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const DayWrapper = styled.div`
  width: 100%;
  @media ${device.tablet} {
  }
`

const DayHeader = styled.div`
  display: flex;
  justify-content: right;
  padding: 0 2rem;
  @media ${device.tablet} {
  }
`

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
const AddNewDiv = styled.div`
  background-color: #7afcff;
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
`
const HeaderWrapper = styled.div``

const NotesDayView = ({
  fullDay,
  content,
  onAddNewClicked,
  loadingComp,
  loading,
}) => {
  const dt = new Date(fullDay)
  const year = dt.getFullYear()
  const month = dt.getMonth() + 1
  const date = dt.getDate()
  if (loading) {
    content = loadingComp
  }
  return (
    <DayWrapper>
      <DayHeader>
        <AddNewDiv onClick={() => onAddNewClicked(year, month, date)}>
          <FontAwesomeIcon icon={faPlus} />
        </AddNewDiv>
      </DayHeader>
      <DayMain>{content}</DayMain>
    </DayWrapper>
  )
}

export default NotesDayView
