import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faCheck,
  faPenToSquare,
  faCalendarDays,
  faArrowTurnUp,
} from '@fortawesome/free-solid-svg-icons'
import { useDeleteNoteMutation } from '../../../redux/slice/api/notesApiSlice'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { device } from '../../../config/deviceBreakpoint'

const Wrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  padding-top: 1rem;
`

const CompletedDiv = styled.div`
  display: flex;
  padding-left: 1rem;
  align-items: center;

  width: 40%;
  @media ${device.tablet} {
  }
`
const FeaturesWrapper = styled.div`
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

const CompletedPointerDiv = styled.div`
  cursor: pointer;
  width: 20%;
  display: flex;
  justify-content: center;
`

const Feature = ({
  note,
  setShowEdit,
  setShowCal,
  handleOnClickCompleted,
  handleEdit,
  handleEditDate,
  handleUnassign,
}) => {
  const [
    deleteNote,
    {
      isLoading: isDelLoading,
      isSuccess: isDelSuccess,
      isError: isDelError,
      error: delerror,
    },
  ] = useDeleteNoteMutation()

  const handleDelete = async () => {
    await deleteNote({ id: note._id })
  }
  return (
    <Wrapper>
      <CompletedDiv>
        <CompletedPointerDiv onClick={handleOnClickCompleted}>
          {note?.completed ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faCircle} />
          )}
        </CompletedPointerDiv>
      </CompletedDiv>
      <FeaturesWrapper>
        <FeatureDiv>
          <FontAwesomeIcon icon={faPenToSquare} onClick={handleEdit} />
        </FeatureDiv>
        <FeatureDiv>
          <FontAwesomeIcon icon={faCalendarDays} onClick={handleEditDate} />
        </FeatureDiv>
        <FeatureDiv>
          <FontAwesomeIcon icon={faArrowTurnUp} onClick={handleUnassign} />
        </FeatureDiv>
        <FeatureDiv>
          <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
        </FeatureDiv>
      </FeaturesWrapper>
    </Wrapper>
  )
}

export default Feature
