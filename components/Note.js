import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useUpdateNoteMutation } from '../redux/slice/api/notesApiSlice'
import ElementMaker from './ElementMaker'
import TextareaMaker from './TextareaMaker'

const NoteDiv = styled.div`
  border: 1px solid black;
  margin: 1rem auto;
  margin-bottom: 2rem;
  width: 100%;
  max-height: 16.3rem;
  background-color: AntiqueWhite;
  display: flex;
  flex-direction: column;
`

const TitleDiv = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  width: 100%;
`
const ContentDiv = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow: auto;
`

const CompletedDiv = styled.div`
  width: 5%;
`
const DeleteDiv = styled.div`
  width: 5%;
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

  return (
    <NoteDiv>
      <TitleDiv>
        <DeleteDiv>x</DeleteDiv>
        <ElementMaker
          value={title}
          handleChange={(e) => setTitle(e.target.value)}
          handleDoubleClick={() => setShowInputEle(true)}
          handleBlur={handleBlur}
          showInputEle={showInputEle}
        />
        <CompletedDiv>{noteCompleted.toString()}</CompletedDiv>
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
