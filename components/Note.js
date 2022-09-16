import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useUpdateNoteMutation } from '../redux/slice/api/notesApiSlice'
import ElementMaker from './ElementMaker'
import TextareaMaker from './TextareaMaker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

const NoteDiv = styled.div`
  margin: 1rem auto;
  margin-bottom: 2rem;
  width: 100%;
  max-height: 16.3rem;
  background-color: AntiqueWhite;
  display: flex;
  flex-direction: column;
`

const TitleDiv = styled.div`
  display: flex;
  width: 100%;
`
const ContentDiv = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow: auto;
`

const CompletedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 10%;
`
const DeleteDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 10%;
`

const Note = ({
  noteId,
  userId,
  noteTitle,
  noteContent,
  noteCompleted,
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
    }
  }, [isError, isFetching])

  const handleBlur = async () => {
    if (noteTitle !== title) {
      await updateNote({ _id: noteId, user: userId, title, content, completed })
    }
    setShowInputEle(false)
  }
  const handleBlurContent = async () => {
    if (noteContent !== content) {
      await updateNote({ _id: noteId, user: userId, title, content, completed })
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
    })
  }

  return (
    <NoteDiv>
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
    </NoteDiv>
  )
}

export default Note
