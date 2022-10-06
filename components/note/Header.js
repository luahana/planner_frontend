import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { useDeleteNoteMutation } from '../../redux/slice/api/notesApiSlice'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { device } from '../../config/deviceBreakpoint'
import Features from './Features'
import { updateNewNotes } from '../../lib/note'

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

const CompletedPointerDiv = styled.div`
  cursor: pointer;
  width: 20%;
  display: flex;
  justify-content: center;
`

const Header = ({
  note,
  did,
  handleCompleted,
  handleEdit,
  handleEditDate,
  handleUnassign,
  setNewNotes,
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
    if (!updateNewNotes(note.newNoteNum, setNewNotes))
      await deleteNote({ id: note._id, did })
  }

  return (
    <Wrapper>
      <CompletedDiv>
        <CompletedPointerDiv onClick={handleCompleted}>
          {note?.completed ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faCircle} />
          )}
        </CompletedPointerDiv>
      </CompletedDiv>
      <Features
        handleEdit={handleEdit}
        handleEditDate={handleEditDate}
        handleUnassign={handleUnassign}
        handleDelete={handleDelete}
      />
    </Wrapper>
  )
}

export default Header
