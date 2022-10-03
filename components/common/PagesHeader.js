import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2.5rem;
`
const PrevDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 2rem;
`
const NextDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 2rem;
`

const PagesHeader = ({ title, prev, next }) => {
  return (
    <Wrapper>
      <Link href={prev}>
        <PrevDiv>
          <FontAwesomeIcon icon={faChevronLeft} />
        </PrevDiv>
      </Link>
      <Header>{title}</Header>
      <Link href={next}>
        <NextDiv>
          <FontAwesomeIcon icon={faChevronRight} />
        </NextDiv>
      </Link>
    </Wrapper>
  )
}

export default PagesHeader
