import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0 1.5rem;
`
const TitleDiv = styled.div`
  font-size: 1.2rem;
`
const ContentDiv = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  overflow-wrap: break-word;
  white-space: pre-line;
  overflow: auto;
  padding-bottom: 1rem;
  max-height: 10.5rem;
`

const ShowView = ({ title, content }) => {
  return (
    <Wrapper>
      <TitleDiv>{title}</TitleDiv>
      <ContentDiv>{content}</ContentDiv>
    </Wrapper>
  )
}

export default ShowView
