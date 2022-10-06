import React from 'react'
import styled from 'styled-components'
import { ymwFromWid } from '../../../lib/date'

const Wrapper = styled.div`
  text-align: center;
`
const Title = ({ wid }) => {
  const { year, month, week } = ymwFromWid(wid)
  return (
    <Wrapper>
      {' '}
      {year}{' '}
      <span style={{ whiteSpace: 'nowrap' }}>
        {month} {week}
      </span>
    </Wrapper>
  )
}

export default Title
