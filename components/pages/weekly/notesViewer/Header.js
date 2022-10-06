import React from 'react'
import styled from 'styled-components'
import { MONTH, WEEKDAY } from '../../../../config/calendar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ymdFromDate } from '../../../../lib/date'
const Wrapper = styled.div`
  padding-right: 1rem;
  width: 20%;
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
const Header = ({ weekday, curDate, onAddNewClicked }) => {
  const { month, date } = ymdFromDate(curDate)

  return (
    <Wrapper>
      <div>{WEEKDAY[weekday]}</div>
      <div>
        {MONTH[month]} {date}
      </div>
      <AddNewDiv onClick={onAddNewClicked}>
        <FontAwesomeIcon icon={faPlus} />
      </AddNewDiv>
    </Wrapper>
  )
}

export default Header
