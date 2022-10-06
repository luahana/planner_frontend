import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faPenToSquare,
  faCalendarDays,
  faArrowTurnUp,
} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  gap: 2rem;
  width: 60%;
  padding-right: 1rem;
  align-items: center;
`

const FeatureDiv = styled.div`
  text-align: center;
  width: 10%;
  cursor: pointer;
`
const Features = ({
  view,
  handleEdit,
  handleEditDate,
  handleUnassign,
  handleDelete,
}) => {
  return (
    <Wrapper>
      <FeatureDiv onClick={handleEdit}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </FeatureDiv>
      <FeatureDiv onClick={handleEditDate}>
        <FontAwesomeIcon icon={faCalendarDays} />
      </FeatureDiv>
      {view !== 'unassigned' && (
        <FeatureDiv onClick={handleUnassign}>
          <FontAwesomeIcon icon={faArrowTurnUp} />
        </FeatureDiv>
      )}

      <FeatureDiv onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </FeatureDiv>
    </Wrapper>
  )
}

export default Features
