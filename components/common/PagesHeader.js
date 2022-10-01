import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const Wrapper = styled.div`
  display: flex;
`

const Header = styled.div`
  font-size: 2.5rem;
`
const PrevDiv = styled.div``
const NextDiv = styled.div``

const PagesHeader = ({ title, prev, next }) => {
  return (
    <Wrapper>
      <Link href={prev}>
        <PrevDiv>
          <FontAwesomeIcon icon={faArrowLeft} />
        </PrevDiv>
      </Link>
      <Header>{title}</Header>
      <Link href={next}>
        <NextDiv>
          <FontAwesomeIcon icon={faArrowRight} />
        </NextDiv>
      </Link>
    </Wrapper>
  )
}

export default PagesHeader
