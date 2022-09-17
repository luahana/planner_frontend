import React from 'react'
import styled from 'styled-components'
import { device } from '../config/deviceBreakpoint'

const ContentTextarea = styled.textarea`
  padding: 1rem calc(5% + 1rem);
  width: 100%;
  height: 10.5rem;
  overflow: auto;
  whitespace: pre-wrap;
  @media ${device.tablet} {
  }
`

const ContentDiv = styled.div`
  padding: 1rem calc(5% + 1rem);
  width: 100%;
  overflow: auto;
  whitespace: pre-wrap;
  @media ${device.tablet} {
  }
`

const ElementMaker = ({
  value,
  handleChange,
  handleBlur,
  handleDoubleClick,
  showContentInputEle,
}) => {
  return (
    <>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        showContentInputEle ? (
          <ContentTextarea
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <ContentDiv onDoubleClick={handleDoubleClick} style={{}}>
            {value}
          </ContentDiv>
        )
      }
    </>
  )
}

export default ElementMaker
