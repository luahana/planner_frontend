import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useUpdateNoteMutation } from '../redux/slice/api/notesApiSlice'
import ElementMaker from './ElementMaker'
import TextareaMaker from './TextareaMaker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { device } from '../config/deviceBreakpoint'

const Wrapper = styled.div`
  width: 100%;
  max-height: 16.3rem;
  background-color: AntiqueWhite;
  display: flex;
  flex-direction: column;
  @media ${device.tablet} {
  }
`

const TitleDiv = styled.div`
  display: flex;
  width: 100%;
  @media ${device.tablet} {
  }
`

const CompletedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 10%;
  @media ${device.tablet} {
  }
`
const DeleteDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 10%;
  @media ${device.tablet} {
  }
`

const ContentDiv = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow: auto;
  @media ${device.tablet} {
  }
`

const Note = ({
  noteId,
  userId,
  noteTitle,
  noteContent,
  noteCompleted,
  noteAssignedDate,
  isFetching,
}) => {
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation()
  const [showInputEle, setShowInputEle] = useState(false)
  const [showContentInputEle, setShowContentInputEle] = useState(false)
  const [title, setTitle] = useState(noteTitle)
  const [content, setContent] = useState(noteContent)
  const [completed, setCompleted] = useState(noteCompleted)

  useEffect(() => {
    if (!showInputEle && !showContentInputEle) {
      setTitle(noteTitle)
      setContent(noteContent)
      setCompleted(noteCompleted)
    }
  }, [isError, isFetching])

  const handleBlur = async () => {
    if (noteTitle !== title) {
      await updateNote({
        _id: noteId,
        user: userId,
        title,
        content,
        completed,
        assignedDate: noteAssignedDate,
      })
    }
    setShowInputEle(false)
  }
  const handleBlurContent = async () => {
    if (noteContent !== content) {
      await updateNote({
        _id: noteId,
        user: userId,
        title,
        content,
        completed,
        assignedDate: noteAssignedDate,
      })
    }
    setShowContentInputEle(false)
  }

  const handleOnClickCompleted = async () => {
    await updateNote({
      _id: noteId,
      user: userId,
      title,
      content,
      completed: !completed,
      assignedDate: noteAssignedDate,
    })
  }

  return (
    <Wrapper>
      <TitleDiv>
        <CompletedDiv onClick={handleOnClickCompleted}>
          {noteCompleted ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={faCircle} />
          )}
        </CompletedDiv>

        <ElementMaker
          value={title}
          handleChange={(e) => setTitle(e.target.value)}
          handleDoubleClick={() => setShowInputEle(true)}
          handleBlur={handleBlur}
          showInputEle={showInputEle}
        />
        <DeleteDiv>
          <FontAwesomeIcon icon={faTrash} />
        </DeleteDiv>
      </TitleDiv>
      <ContentDiv>
        <TextareaMaker
          value={content}
          handleChange={(e) => setContent(e.target.value)}
          handleDoubleClick={() => setShowContentInputEle(true)}
          handleBlur={handleBlurContent}
          showContentInputEle={showContentInputEle}
        />
      </ContentDiv>
    </Wrapper>
  )
}

export default Note
