import React, { memo } from 'react'
import styled from 'styled-components'
import { device } from '../config/deviceBreakpoint'

const TitleInput = styled.input`
  padding: 1rem;
  width: 100%;
  height: 100%;
  overflow: auto;
  @media ${device.tablet} {
  }
`

const TitleDiv = styled.div`
  padding: 1rem;
  display: inline-block;
  width: 100%;
  overflow: auto;
  @media ${device.tablet} {
  }
`

const ElementMaker = ({
  type,
  value,
  handleChange,
  handleBlur,
  handleDoubleClick,
  showInputEle,
}) => {
  return (
    <>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        showInputEle ? (
          <TitleInput
            type={type}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            maxlength='50'
            autoFocus
          />
        ) : (
          <TitleDiv onDoubleClick={handleDoubleClick}>{value}</TitleDiv>
        )
      }
    </>
  )
}

export default memo(ElementMaker)
