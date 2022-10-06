import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`

const Loading = ({ size }) => {
  return (
    <Wrapper>
      <ClipLoader color='aqua' size={size} aria-label='Loading Spinner' />
    </Wrapper>
  )
}

export default Loading
