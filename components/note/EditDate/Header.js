import React from 'react'
import styled from 'styled-components'
import { calcMid } from '../../../lib/calendar'
import { ymdFromMid } from '../../../lib/date'

import { addZero } from '../../../lib/date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const NavDiv = styled.div`
  display: flex;
  align-items: center;
`

const ArrowDiv = styled.div`
  margin: 1rem;
  cursor: pointer;
`

const SelectDiv = styled.div`
  margin-right: 2rem;
  background-color: #7afcff;
  padding: 0.1rem 0.4rem;
  cursor: pointer;
`

const TitleDiv = styled.div``

const Header = ({ curMid, setCurMid, onChangeClicked }) => {
  const { year, month } = ymdFromMid(curMid)
  return (
    <Wrapper>
      <NavDiv>
        <ArrowDiv onClick={() => setCurMid(calcMid(curMid, -1))}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </ArrowDiv>
        <TitleDiv>{`${year} ${addZero(month)}`}</TitleDiv>
        <ArrowDiv onClick={() => setCurMid(calcMid(curMid, 1))}>
          <FontAwesomeIcon icon={faChevronRight} />
        </ArrowDiv>
      </NavDiv>
      <SelectDiv onClick={onChangeClicked}>Select</SelectDiv>
    </Wrapper>
  )
}

export default Header
